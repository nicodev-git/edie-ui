import React from 'react'

import DeviceMonitorsModalView from './DeviceMonitorsModalView'

export default class DeviceMonitorsModal extends React.Component {
  onHide () {
    this.props.showDeviceMonitorsModal(false)
  }
  onChangedMonitors (monitors) {
    console.log(monitors)
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
