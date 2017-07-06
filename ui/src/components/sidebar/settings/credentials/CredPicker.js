import React, { Component } from 'react'
import { assign } from 'lodash'

import CredPickerView from './CredPickerView'

export default class CredentialModal extends Component {
  closeModal () {
    // this.props.closeCredentialsModal()
  }

  render () {
    return (
      <CredPickerView
        onHide={this.closeModal.bind(this)}
      />
    )
  }
}
