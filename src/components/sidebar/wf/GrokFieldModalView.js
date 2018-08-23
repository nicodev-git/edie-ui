import React, {Component} from 'react'
import {Field} from 'redux-form'
import {
  FormInput
} from './parts'

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
      <form onSubmit={onSubmit}>
        <Field name="value" component={FormInput}/>
      </form>
    )
  }
}