import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import GrokFieldModalView from './GrokFieldModalView'

import {fieldMatchRules} from 'shared/Global'

class GrokFieldModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: []
    }
  }
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  onClickAddVal () {

  }

  render () {
    const {handleSubmit, editGrokField, keyField} = this.props
    return (
      <GrokFieldModalView
        keyField={keyField}
        editGrokField={editGrokField}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        ruleOptions={fieldMatchRules}

        values={this.state.values}
        onClickAddVal={this.onClickAddVal.bind(this)}
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
