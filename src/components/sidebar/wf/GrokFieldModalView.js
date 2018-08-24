import React, {Component} from 'react'
import {Field} from 'redux-form'
import {
  FormInput,
  FormSelect,
  SubmitBlock
} from 'components/modal/parts'

export default class GrokFieldModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render() {
    const {
      onSubmit, editGrokField, ruleOptions, keyField
    } = this.props

    return (
      <div className="padding-sm">
        <form onSubmit={onSubmit}>
          {keyField === 'value' ? <Field name="value" component={FormInput} floatingLabel={editGrokField.name}/> : null}
          {keyField === 'rule' ? <Field name="rule" component={FormSelect} floatingLabel="Rule" options={ruleOptions}/> : null}
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}