import React from 'react'

import DeviceMonitorsModalView from './DeviceMonitorsModalView'

export default class DeviceMonitorsModal extends React.Component {
  onChangedMonitors (monitors) {
    console.log(monitors)
  }
  render () {
    const {editDevice} = this.props
    return (
      <DeviceMonitorsModalView
        {...this.props}
        monitors={editDevice.monitors || []}
        onChangedMonitors={this.onChangedMonitors.bind(this)}
      />
    )
  }
}
