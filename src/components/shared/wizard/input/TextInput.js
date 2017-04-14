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
    const { input, label, disabled } = config
    return (
      <TextField
        hintText={label}
        inputStyle={inputStyle}
        underlineFocusStyle={underlineStyle}
        disabled={disabled ? 'disabled' : null}
        {...input}
      />
    )
  }

  //
  render () {
    const { config } = this.props

    let label

    if (config.label !== null) {
      if (config.label.type === 'place') {
        label = config.label.text || ''
      } else {
        label = config.label
      }
    }

    return (
      <Field type="text"
        name={config.name} label={label} component={this.renderField}
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
