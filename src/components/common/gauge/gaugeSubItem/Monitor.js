import React from 'react'
import {Select, MenuItem, IconButton} from '@material-ui/core'
import {findIndex, assign, concat} from 'lodash'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import MonitorPicker from 'components/dashboard/map/device/monitors/MonitorPicker'
import MonitorDetailModal from './MonitorDetailModal'
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
  addMonitor (monitorConfig) {
    this.props.openDeviceMonitorWizard(null, monitorConfig)
    return true
  }
  onChange (event, key, payload) {
    this.setState({deviceId: payload})
  }

  onClickAddMonitor () {
    if (!this.state.deviceId) return null
    this.props.openDevice(this.getDevice())
    this.setState({ editMonitor: null }, () => {
      this.props.openDeviceMonitorPicker()
    })
  }

  onClickEditMonitor (selected) {
    const {monitorTemplates} = this.props
    if (!selected) return showAlert('Please select monitor.')

    this.props.openDevice(this.getDevice())
    let monitorConfig = monitorTemplates.filter(p => p.monitortype === selected.monitortype)
    monitorConfig = monitorConfig.length ? monitorConfig[0] : null
    this.setState({
      editMonitor: selected
    }, () => {
      this.props.openDeviceMonitorWizard(selected, monitorConfig)
    })
  }
  onClickViewMonitor (monitor) {
    if (monitor.monitortype === 'logfile') {
      setTimeout(() => {
        this.props.history.push('/viewlog')
        this.props.updateViewLogParams({
          ...this.props.logViewParam,
          q: `(monitorid:${monitor.uid})`
        }, this.props.history)
      }, 1)
    } else {
      this.props.showMonitorDetailModal(true, monitor, this.getDevice())
    }
  }
  onStep0 () {
    this.onClickAddMonitor()
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
  ///////////////////////////////////////////////////////////////////////////////////////////////
  renderItem (tpl, i) {
    return (
      <AppletCard
        key={tpl.uid}
        color={colors[i % colors.length]}
        name={tpl.monitortype}
        desc={tpl.name}
        img={this.getMonitorImage(tpl.monitortype)}
        onClickView={() => this.onClickViewMonitor(tpl)}
        onClickEdit={() => this.onClickEditMonitor(tpl)}
        verified
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
        onStep0={this.onStep0.bind(this)}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }
  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onClick={this.onClickAddMonitor.bind(this)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  }
  renderMonitorPicker () {
    if (!this.props.monitorPickerVisible) return null

    return (
      <MonitorPicker
        {...this.props}
        onClickItem={monitorConfig => {
          this.setState({monitorConfig}, () => {
            this.addMonitor(monitorConfig)
          })
          return true
        }}
      />
    )
  }
  renderMonitorDetail () {
    if (!this.props.monitorDetailModalOpen) return null
    return (
      <MonitorDetailModal {...this.props}/>
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
          <FormControl className="valign-top">
            <InputLabel>Devices</InputLabel>
            <Select
              value={deviceId}
              onChange={this.onChange}>
              {(devices || []).map(p =>
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          {this.renderAddMenu()}
        </div>
        <div>
          <ul className="web-applet-cards">
            {monitors.map(this.renderItem.bind(this))}
          </ul>
        </div>

        {this.renderMonitorPicker()}
        {this.renderMonitorWizard()}
        {this.renderMonitorDetail()}
      </div>
    )
  }
}