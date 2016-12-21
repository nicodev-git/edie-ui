import React from 'react'
import { Field } from 'redux-form'

import { util } from '../WizardUtil'

const renderField2 = ({ input, type, label, cls, useColumn, disabled, width, style, placeholder, meta: { touched, error } }) => {
  const field = (
        <div className={`col-md-${width}`}
          style={util.convertStyle(style)}>
            <input {...input} type={type}
              className={`form-control ${cls || ''}`}
              disabled={disabled ? 'disabled' : null}
              placeholder={placeholder}/>

        </div>
    )

  return util.wrapInputs(label, field, useColumn)
}

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

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
              placeholder={placeholder}/>
    )
  }

  renderField (config) {
    const { input, type, label, cls, useColumn, disabled, width, style, placeholder, meta: { touched, error } } = config

    const field = (
            <div className={`col-md-${width}`}
              style={util.convertStyle(style)}>
                <input {...input} type={type}
                  className={`form-control ${cls || ''}`}
                  disabled={disabled ? 'disabled' : null}
                  placeholder={placeholder}/>

            </div>
        )

    return util.wrapInputs(label, field, useColumn)
  }
}

TextInput.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
