import React from 'react'

import AppDevicesModalView from './AppDevicesModalView'

export default class AppDevicesModal extends React.Component {
  render () {
    const {devices, onHide, selectedApp} = this.props
    return (
      <AppDevicesModalView
        devices={devices}
        onHide={onHide}
        selectedApp={selectedApp}
      />
    )
  }
}
