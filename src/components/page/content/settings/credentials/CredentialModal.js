import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import { SimpleModalForm } from '../../../../modal'

class CredentialModal extends Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  closeModal () {
    this.props.closeCredentialsModal()
  }

  handleFormSubmit (values) {
    const { editCredentials } = this.props
    let props = assign({}, editCredentials, values)
    if (editCredentials) {
      this.props.updateCredentials(props)
    } else {
      this.props.addCredentials(props)
    }
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'Credentials'
    let content = [
      {name: 'Name'},
      {name: 'User Name'},
      {name: 'Password'},
      {name: 'Description'}
    ]
    let buttonText = 'Save'
    return (
      <SimpleModalForm
        show={this.props.open}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        content={content}
        header={header}
        buttonText={buttonText}
      />
    )
  }
}
export default connect(
  state => ({
    initialValues: state.settings.editCredentials,
    validate: validate
  })
)(reduxForm({form: 'credentialsEditForm'})(CredentialModal))
