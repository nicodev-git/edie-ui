import React from 'react'
import { reduxForm } from 'redux-form'

import DeviceCredsModalView from './DeviceCredsModalView'

class DeviceCredsModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredTypes()
    this.props.fetchCredentials()
  }
  onHide () {
    this.props.showDeviceCredsModal(false)
  }

  onCloseCredPicker (selected) {
    if (selected) {
      this.props.addCredentials({
        ...selected,
        deviceIds: [this.props.editDevice.id]
      })
    }
    this.props.showDeviceCredsPicker(false)
  }

  onClickDelete (i, cred) {
    this.props.removeCredentials(cred)
  }

  onChangeGlobalCredential (newCred, oldCred) {
    const {editDevice} = this.props
    const deviceIds = oldCred.deviceIds || []
    this.props.updateCredentials({
      ...newCred,
      deviceIds: deviceIds.filter(p => p !== editDevice.id)
    })

    this.props.updateCredentials({
      ...newCred,
      deviceIds: [...(newCred.deviceIds || []), editDevice.id]
    })
  }

  onChangeIntegratedSecurity (checked) {
    const {editDevice} = this.props
    this.props.updateMapDevice({
      ...editDevice,
      useIntegratedSecurity: checked
    })
  }

  render () {
    const {credentials, editDevice} = this.props
    const deviceCreds = credentials.filter(p => !p.global && (p.deviceIds || []).includes(editDevice.id))
    return (
      <DeviceCredsModalView
        {...this.props}
        onCloseCredPicker={this.onCloseCredPicker.bind(this)}
        extraParams={this.props.editDevice}
        deviceCredentials={deviceCreds}
        deviceGlobalCredentials={credentials.filter(p => p.global && !p.default && (p.deviceIds || []).includes(editDevice.id))}
        onHide={this.onHide.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
        onChangeGlobalCredential={this.onChangeGlobalCredential.bind(this)}
        onChangeIntegratedSecurity={this.onChangeIntegratedSecurity.bind(this)}
      />
    )
  }
}

export default reduxForm({
  form: 'deviceCredsForm'
})(DeviceCredsModal)
