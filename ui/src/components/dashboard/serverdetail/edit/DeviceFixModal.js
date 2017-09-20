import React from 'react'

import DeviceFixModalView from './DeviceFixModalView'

export default class DeviceFixModal extends React.Component {
  getMessage () {
    const {fixCode} = this.props
    let msg = ''
    switch (fixCode) {
      case 1:
        msg = 'No Agent/Collector defined. Please edit device and choose agent or collector. If you need agent, click "Install" button to install agent. Otherwise, please choose collector.'
        break
      case 2:
        msg = 'No login credentials found. Please add SSH credentials.'
        break
      case 3:
        msg = 'Please choose linux os name.'
        break
      case 4:
        msg = 'Failed to check device with current credentials. Please check if credentials are correct.'
        break
      default:
        msg = ''
        break
    }

    return msg
  }
  onHide () {
    this.props.showDeviceFixModal(false)
  }
  render () {
    return (
      <DeviceFixModalView
        {...this.props}
        msg={this.getMessage()}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
