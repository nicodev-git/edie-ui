import React from 'react'
import {Form} from 'redux-form'

import { Modal } from 'components/modal/parts'
import CredPicker from 'components/common/wizard/input/CredPicker'
import CredentialModal from 'components/credentials/CredentialModal'
import {isWindowsDevice} from 'shared/Global'

export default class DeviceCredsModalView extends React.Component {
  renderCredPicker () {
    const {onCloseCredPicker, deviceCredsPickerVisible, credentials} = this.props
    if (!deviceCredsPickerVisible) return null
    return (
      <CredentialModal
        credentials={credentials}
        credentialTypes={this.props.credentialTypes}
        addCredentials={onCloseCredPicker}
        onClose={onCloseCredPicker}
      />
    )
  }

  render () {
    const {onHide, deviceCredentials, deviceGlobalCredentials, editDevice} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <Form onSubmit={() => {}}>
          <CredPicker
            {...this.props}
            deviceCredentials={deviceCredentials}
            deviceGlobalCredentials={deviceGlobalCredentials}
            isWin={isWindowsDevice(editDevice)}
          />
        </Form>
        {this.renderCredPicker()}
      </Modal>
    )
  }
}
