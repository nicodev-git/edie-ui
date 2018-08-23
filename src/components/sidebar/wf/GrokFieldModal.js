import React, {Component} from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

class GrokFieldModal extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <SimpleModalForm
        onHide={onClose}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {}
  }), {})(reduxForm({
  form: 'grokFieldValueForm'
})(GrokFieldModal))
