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

    const { handleSubmit, content, header, subheader, buttonText, 
      imageUpload, fileUpload } = this.props
    return (
      <SimpleModalForm
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        content={content}
        header={header}
        subheader={subheader}
        buttonText={buttonText}
      />
    )
  }
}

export default connect(
  state => ({
    open: true,
  }), {})(reduxForm({
    form: 'newIncidentModal',
    validate
  })(NewIncidentModal))
