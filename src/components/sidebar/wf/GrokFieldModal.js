import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import GrokFieldModalView from './GrokFieldModalView'

const ruleOptions = [{
  label: 'Match', value: 'match'
}, {
  label: 'Not Match', value: 'notMatch'
}]

class GrokFieldModal extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render () {
    const {handleSubmit, editGrokField, keyField} = this.props
    return (
      <GrokFieldModalView
        keyField={keyField}
        editGrokField={editGrokField}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        ruleOptions={ruleOptions}
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
