import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import GrokFieldModalView from './GrokFieldModalView'

class GrokFieldModal extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render () {
    const {handleSubmit, editGrokField} = this.props
    return (
      <GrokFieldModalView
        editGrokField={editGrokField}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editGrokField
  }), {})(reduxForm({
  form: 'grokFieldValueForm'
})(GrokFieldModal))
