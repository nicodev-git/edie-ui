import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { util } from '../WizardUtil'
import { inputStyle, underlineStyle } from 'style/materialStyles'

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // className={`col-md-${width}`}
  // className={`${cls || ''}`}

  renderField (config) {
    const { input, label, disabled, style, useColumn } = config
    const field = (
      <div style={util.convertStyle(style)}>
        <TextField
          hintText={<label>{label}</label>}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          disabled={disabled ? 'disabled' : null}
          {...input}
        />
      </div>
    )
    return util.wrapInputs(field, useColumn)
  }

  //
  render () {
    const { config } = this.props

    let label = ''
    if (config.label !== null) {
      label = config.label.text || ''// this.props.buildLabel(config.label)
    }
    return (
      <Field
        name={config.name} label={label} component={this.renderField}
        style={config.style}
        cls={config.cls}
        useColumn={config.useColumn}
        disabled={config.disabled}
      />
    )
  }
}

TextInput.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
