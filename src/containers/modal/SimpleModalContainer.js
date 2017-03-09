import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import { SimpleModalForm } from '../../components/modal'

class SimpleModalContainer extends Component {
  handleFormSubmit (event) {
    console.log(event)
    this.props.doAction()
    this.onHide()
  }

  onHide () {
    if (!this.props.onClose) {
      this.setState({open: false}, () => {
        this.props.onClose && this.props.onClose(this)
      })
    } else {
      this.props.onClose()
    }
  }

  render () {
    const { handleSubmit, content, header } = this.props
    let buttonText = (this.props.buttonText) ? (this.props.buttonText) : 'Save'
    let subheader = (this.props.subheader) ? (this.props.subheader) : null
    let imageUpload = (this.props.imageUpload) ? true : false
    let fileUpload = (this.props.imageUpload) ? true : false
    return (
      <SimpleModalForm
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        content={content}
        header={header}
        subheader={subheader}
        buttonText={buttonText}
        imageUpload={imageUpload}
        fileUpload={fileUpload}
      />
    )
  }
}

export default connect(
  state => ({
    open: true,
  }), {})(reduxForm({
    form: 'simpleModalForm',
    validate
  })(SimpleModalContainer))
