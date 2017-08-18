import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { inputStyle, underlineStyle } from 'style/common/materialStyles'

export default class TextInput extends React.Component {
  renderField (config) {
    const {input, label, disabled, className} = config
    const field = (
      <TextField
        {...input}
        floatingLabelText={<label>{label}</label>}
        inputStyle={inputStyle}
        underlineFocusStyle={underlineStyle}
        disabled={!!disabled}
        className={className}
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
    return (
      <Field
        name={config.name}
        label={label}
        component={this.renderField}
        style={config.style}
        onChange={onChange}
        className={config.cls}
        disabled={config.disabled}
      />
    )
  }
}
