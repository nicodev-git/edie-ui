import React, { Component } from 'react'

import CredPickerView from './CredPickerView'

export default class CredPicker extends Component {
  constructor (props) {
    super (props)
    this.state = {
      type: ''
    }
  }

  componentWillMount () {
    this.props.fetchCredentials()
    this.props.selectCreds(null)
  }
  onChangeType (e) {
    this.setState({
      type: e.target.value
    })
    this.props.selectCreds(null)
  }
  onSelect (p) {
    this.props.selectCreds(p)
  }
  closeModal () {
    const {onClose} = this.props
    onClose && onClose()
  }
  onClickOK () {
    const {selectedCreds, onClose} = this.props
    if (selectedCreds) {
      onClose && onClose(selectedCreds)
    }
  }
  render () {
    const {credentials, selectedCreds, credentialTypes, global} = this.props
    return (
      <CredPickerView
        global={global}
        credentialTypes={credentialTypes}
        type={this.state.type}
        onSelect={this.onSelect.bind(this)}
        selectedCreds={selectedCreds}
        credentials={credentials}
        onClickOK={this.onClickOK.bind(this)}
        onHide={this.closeModal.bind(this)}
        onChangeType={this.onChangeType.bind(this)}
      />
    )
  }
}
