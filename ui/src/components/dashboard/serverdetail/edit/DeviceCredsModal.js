import React from 'react'

import DeviceCredsModalView from './DeviceCredsModalView'

export default class DeviceCredsModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredTypes()
    this.props.fetchCredentials()
  }
  onHide () {
    this.props.showDeviceCredsModal(false)
  }
  onClickAdd () {
    this.props.showDeviceCredsPicker(true)
  }
  render () {
    return (
      <DeviceCredsModalView
        {...this.props}
        onHide={this.onHide.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
      />
    )
  }
}
