import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { util } from '../WizardUtil'
import { inputStyle, underlineStyle } from 'style/materialStyles'

export default class TextInput extends React.Component {
  renderField (config) {
    const {input, label, disabled, style, useColumn} = config
    const field = (
      <div style={util.convertStyle(style)}>
        <TextField
          floatingLabelText={<label>{label}</label>}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          disabled={!!disabled}
          {...input}
        />
      </div>
    )
    return util.wrapInputs(field, useColumn)
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
        disabled={config.disabled}
      />
    )
  }
}
