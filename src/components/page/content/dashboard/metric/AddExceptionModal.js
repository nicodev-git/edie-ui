import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import AddExceptionModalView from '../../../../modal'

class AddExceptionModal extends Component {
  handleFormSubmit ({name, files}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('file: ', files)
    this.onHide()
  }

  onClickSave() {

  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, success)
    })
  }

  onClickClose () {
    this.onHide()
  }

  render () {
    const { handleSubmit } = this.props
    let text = (this.props.incident) ? (this.props.incident.rawtext) : ''
    return (
      <AddExceptionModalView
        show
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onChange={this.onChangeFile.bind(this)}
        onSave={this.onClickSave.bind(this)}
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
