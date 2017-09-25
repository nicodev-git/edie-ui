import React from 'react'

import DeviceMonitorsModalView from './DeviceMonitorsModalView'

export default class DeviceMonitorsModal extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorTemplates()
  }
  onHide () {
    this.props.showDeviceMonitorsModal(false)
  }
  onChangedMonitors (monitors) {
    const {editDevice} = this.props
    console.log(monitors)
    this.props.updateMapDevice({
      ...editDevice,
      monitors
    })
  }
  render () {
    const {editDevice} = this.props
    return (
      <DeviceMonitorsModalView
        {...this.props}
        onHide={this.onHide.bind(this)}
        monitors={editDevice.monitors || []}
        onChangedMonitors={this.onChangedMonitors.bind(this)}
      />
    )
  }
}
