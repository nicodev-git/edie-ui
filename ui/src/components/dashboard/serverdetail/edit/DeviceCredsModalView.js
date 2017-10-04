import React from 'react'
import {Form} from 'redux-form'

import { Modal } from 'components/modal/parts'
import CredPicker from 'components/common/wizard/input/CredPicker'
import CredentialModal from 'components/credentials/CredentialModal'

export default class DeviceCredsModalView extends React.Component {
  renderCredPicker () {
    const {onCloseCredPicker, deviceCredsPickerVisible} = this.props
    if (!deviceCredsPickerVisible) return null
    return (
      <CredentialModal
        credentialTypes={this.props.credentialTypes}
        addCredentials={onCloseCredPicker}
        onClose={onCloseCredPicker}
      />
    )
  }

  render () {
    const {onHide, deviceCredentials, deviceGlobalCredentials} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <Form onSubmit={() => {}}>
          <CredPicker
            {...this.props}
            deviceCredentials={deviceCredentials}
            deviceGlobalCredentials={deviceGlobalCredentials}
          />
        </Form>
        {this.renderCredPicker()}
      </Modal>
    )
  }
}
