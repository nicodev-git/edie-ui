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
      onSubmit
    } = this.props

    return (
      <div className="padding-md">
        <form onSubmit={onSubmit}>
          <Field name="value" component={FormInput}/>
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}