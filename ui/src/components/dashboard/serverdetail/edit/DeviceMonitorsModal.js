import React from 'react'

import DeviceMonitorsModalView from './DeviceMonitorsModalView'

export default class DeviceMonitorsModal extends React.Component {
  render () {
    return (
      <DeviceMonitorsModalView
        {...this.props}
      />
    )
  }
}
