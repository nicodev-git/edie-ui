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
  // onClickAdd () {
  //   this.props.showDeviceCredsPicker(true)
  // }

  onClickDelete () {

  }

  onChangeGlobalCredential () {

  }

  render () {
    return (
      <DeviceCredsModalView
        {...this.props}
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
