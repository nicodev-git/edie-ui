import React from 'react'
import { Field } from 'redux-form'
import TextField from '@material-ui/core/TextField'

import {required} from 'components/modal/validation/CommonValidation'

export default class TextInput extends React.Component {
  renderField (config) {
    const {input, label, disabled, className} = config
    const field = (
      <TextField
        {...input}
        label={label}
        disabled={!!disabled}
        className={`valign-top mr-dialog ${className}`}
      />
    )
    return field
  }

  //
  render () {
    const {config, onChange} = this.props

    let label = ''
    if (config.label !== null) {
      label = config.label.text || ''// this.props.buildLabel(config.label)
    }
    const validate = []
    if (config.required) validate.push(required)
    return (
      <Field
        name={config.name}
        label={label}
        component={this.renderField}
        style={config.style}
        onChange={onChange}
        className={`${config.cls} margin-md-right`}
        disabled={config.disabled}
        validate={validate}
      />
    )
  }
}
