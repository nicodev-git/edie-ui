import React from 'react'
import {SelectField, MenuItem} from 'material-ui'
import {findIndex, assign, concat} from 'lodash'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import AppletCard from 'components/common/AppletCard'
import { showAlert } from 'components/common/Alert'

import { extImageBaseUrl, appletColors as colors } from 'shared/Global'


export default class Monitor extends React.Component {
  constructor () {
    super()
    this.state = {
      device: null,

      editMonitor: null,
      monitorConfig: null
    }
    this.onChange = this.onChange.bind(this)
  }
  getMonitorImage (monitortype) {
    const {monitorTemplates} = this.props
    const index = findIndex(monitorTemplates, {monitortype})
    if (index < 0) return '/resources/images/dashboard/gauge.png'

    return `${extImageBaseUrl}${monitorTemplates[index].image}`
  }
  onChange (event, key, payload) {
    this.setState({device: payload})
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
    let device = assign({}, this.props.device)
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
    const type = 'monitor-custom'
    return (
      <MonitorWizardContainer
        deviceType={type}
        title={`Add ${monitorConfig ? monitorConfig.name : ''} Monitor To ${this.props.device.name}`}
        onClose={() => {
          this.props.closeDeviceMonitorWizard()
        }}
        onStep0={this.onStep0.bind(this)}
        extraParams={{}}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }
  render () {
    const {devices} = this.props
    const {device} = this.state
    const monitors = device ? (device.monitors || []) : []

    return (
      <div>
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Devices"
            value={device ? device.id : ''}
            className="valign-top"
            onChange={this.onChange}
          >
            {(devices || []).map(p =>
              <MenuItem key={p.id} value={p} primaryText={p.name}/>
            )}
          </SelectField>
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