import React from 'react'
import {SelectField, MenuItem, IconButton} from 'material-ui'
import {findIndex, assign, concat} from 'lodash'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import AppletCard from 'components/common/AppletCard'
import { showAlert } from 'components/common/Alert'

import { extImageBaseUrl, appletColors as colors } from 'shared/Global'


export default class Monitor extends React.Component {
  constructor () {
    super()
    this.state = {
      deviceId: null,

      editMonitor: null,
      monitorConfig: null
    }
    this.onChange = this.onChange.bind(this)
  }
  getDevice () {
    const {deviceId} = this.state
    const {devices} = this.props
    const index = findIndex(devices, {id: deviceId})
    if (index < 0) return null
    return devices[index]
  }
  getMonitorImage (monitortype) {
    const {monitorTemplates} = this.props
    const index = findIndex(monitorTemplates, {monitortype})
    if (index < 0) return '/resources/images/dashboard/gauge.png'

    return `${extImageBaseUrl}${monitorTemplates[index].image}`
  }
  onChange (event, key, payload) {
    this.setState({deviceId: payload})
  }

  onClickEditMonitor (selected) {
    const {monitorTemplates} = this.props
    if (!selected) return showAlert('Please select monitor.')

    let monitorConfig = monitorTemplates.filter(p => p.monitortype === selected.monitortype)
    monitorConfig = monitorConfig.length ? monitorConfig[0] : null
    this.setState({
      editMonitor: selected
    }, () => {
      this.props.openDeviceMonitorWizard(selected, monitorConfig)
    })
  }

  onFinishMonitorWizard (res, params) {
    let editMonitor = this.state.editMonitor
    let device = assign({}, this.getDevice())
    let monitor = assign({}, editMonitor, params)

    if (editMonitor) {
      // Edit
      const index = findIndex(device.monitors, {uid: editMonitor.uid})
      if (index >= 0) device.monitors[index] = monitor
    } else {
      // Add

      const {monitorConfig} = this.state
      assign(monitor, {
        monitortype: monitorConfig.monitortype
      })

      device.monitors = concat(device.monitors || [], monitor)
    }

    this.props.updateMapDevice(device)
    this.props.closeDeviceMonitorWizard()
  }


  renderItem (tpl, i) {
    return (
      <AppletCard
        key={tpl.uid}
        color={colors[i % colors.length]}
        name={tpl.monitortype}
        desc={tpl.name}
        img={this.getMonitorImage(tpl.monitortype)}
        onClickEdit={() => this.onClickEditMonitor(tpl)}
      />
    )
  }
  renderMonitorWizard () {
    if (!this.props.monitorWizardVisible) return null

    const {monitorConfig} = this.state
    const device = this.getDevice()
    const type = 'monitor-custom'
    return (
      <MonitorWizardContainer
        deviceType={type}
        title={`Add ${monitorConfig ? monitorConfig.name : ''} Monitor To ${device.name}`}
        onClose={this.props.closeDeviceMonitorWizard}
        extraParams={{}}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }
  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={() => this.props.showGaugePicker(true)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  }
  render () {
    const {devices} = this.props
    const {deviceId} = this.state
    const device = this.getDevice()
    const monitors = device ? (device.monitors || []) : []

    return (
      <div>
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Devices"
            value={deviceId}
            className="valign-top"
            onChange={this.onChange}
          >
            {(devices || []).map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>
          {this.renderAddMenu()}
        </div>
        <div>
          <ul className="web-applet-cards">
            {monitors.map(this.renderItem.bind(this))}
          </ul>
        </div>

        {this.renderMonitorWizard()}
      </div>
    )
  }
}