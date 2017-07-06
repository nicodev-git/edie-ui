import React, { Component } from 'react'

import CredPickerView from './CredPickerView'

export default class CredPicker extends Component {
  componentWillMount () {
    this.props.fetchCredentials()
  }
  closeModal () {
    const {onClose} = this.props
    onClose && onClose()
  }

  render () {
    const {credentials} = this.props
    return (
      <CredPickerView
        credentials={credentials}
        onHide={this.closeModal.bind(this)}
      />
    )
  }
}
