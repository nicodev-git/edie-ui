import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import GrokFieldModalView from './GrokFieldModalView'

import {fieldMatchRules} from 'shared/Global'

class GrokFieldModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: (props.editGrokField ? props.editGrokField.values : []) || []
    }
  }
  handleFormSubmit (props) {
    const {values} = this.state
    const entity = {
      ...props,
      values
    }
    this.props.onSave(entity)
    this.props.onClose()
  }

  onClickAddVal () {
    const val = prompt('Please input value', '')
    if (!val) return
    const {values} = this.state
    this.setState({
      values: [...values, val]
    })
  }

  onClickDeleteVal (index) {
    const {values} = this.state
    if (!window.confirm('Click OK to remove')) return
    this.setState({
      values: values.filter((p, i) => i !== index)
    })
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
        onClickDeleteVal={this.onClickDeleteVal.bind(this)}
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
