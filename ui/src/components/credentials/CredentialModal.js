import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import { SimpleModalForm } from 'components/modal'

class CredentialModal extends Component {
  closeModal () {
    this.props.onClose()
  }

  handleFormSubmit (values) {
    const { initialValues } = this.props
    let props = assign({}, initialValues, values)
    if (initialValues.id) {
      this.props.updateCredentials(props)
    } else {
      this.props.addCredentials(props)
    }
  }

  render () {
    const { handleSubmit, credentialTypes } = this.props
    const content = [
      {name: 'Name'},
      {name: 'User Name'},
      {name: 'Password', type: 'password'},
      {name: 'Type', type: 'select', options: credentialTypes.map(t => ({label: t.name, value: t.name}))},
      {name: 'Description'},
      {name: 'Global', type: 'checkbox'},
      {name: 'Default', type: 'checkbox'}
    ]


    return (
      <SimpleModalForm
        show
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        content={content}
        header="Credentials"
        buttonText="Save"
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {
      type: state.devices.credModalDefaultType || '',
      ...state.settings.editCredentials
    }
  })
)(reduxForm({form: 'credentialModalForm'})(CredentialModal))
