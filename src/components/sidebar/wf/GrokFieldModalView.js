import React, {Component} from 'react'
import {Field} from 'redux-form'
import {
  FormInput,
  SubmitBlock
} from 'components/modal/parts'

export default class GrokFieldModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render() {
    const {
      onSubmit, editGrokField
    } = this.props

    return (
      <div className="padding-sm">
        <form onSubmit={onSubmit}>
          <Field name="value" component={FormInput} floatingLabel={editGrokField.name}/>
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}