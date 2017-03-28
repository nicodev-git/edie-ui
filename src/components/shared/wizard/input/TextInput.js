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

  renderField (config) {
    const { input, label, cls, disabled, width, style, useColumn } = config
    const field = (
      <div className={`col-md-${width}`}
        style={util.convertStyle(style)}>
        <TextField hintText={label}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          className={`${cls || ''}`}
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

    let label
    let width = util.calcWidth(config.width)

    let placeholder = ''

    if (config.label !== null) {
      if (config.label.type === 'place') {
        placeholder = config.label.text || ''
      } else {
        label = this.props.buildLabel(config.label)
        width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
      }
    }

    return (
      <Field type="text"
        name={config.name} label={label} component={this.renderField}
        style={config.style}
        width={width}
        cls={config.cls}
        useColumn={config.useColumn}
        disabled={config.disabled}
        placeholder={placeholder}
      />
    )
  }
}

TextInput.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
