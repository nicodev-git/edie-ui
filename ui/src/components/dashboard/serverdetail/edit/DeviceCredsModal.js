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

  onCloseCredPicker (selected) {
    if (selected) {
      console.log(selected)
    }
    this.props.showDeviceCredsPicker(false)
  }

  onClickDelete () {

  }

  onChangeGlobalCredential (newCred, oldCred) {

  }

  render () {
    return (
      <DeviceCredsModalView
        {...this.props}
        onCloseCredPicker={this.onCloseCredPicker.bind(this)}
        extraParams={this.props.editDevice}
        deviceCredentials={[]}
        deviceGlobalCredentials={[]}
        onHide={this.onHide.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
        onChangeGlobalCredential={this.onChangeGlobalCredential.bind(this)}
      />
    )
  }
}
