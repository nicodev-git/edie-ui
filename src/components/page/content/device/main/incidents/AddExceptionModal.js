import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../../modal/validation/NameValidation'
import AddExceptionModalView from '../../../../../modal'

class AddExceptionModal extends Component {
  handleFormSubmit ({name}) {
    console.log('form submitting')
    console.log('filter: ', name)
    this.onHide()
  }

  onClickSave () {
    // TODO
  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, success)
    })
  }

  render () {
    const { handleSubmit } = this.props
    let text = (this.props.incident) ? (this.props.incident.rawtext) : ''
    return (
      <AddExceptionModalView
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        text={text}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    open: true
  }), {})(reduxForm({
    form: 'addExceptionModal',
    validate
  })(AddExceptionModal))
