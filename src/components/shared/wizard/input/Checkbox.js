import React from 'react'
import {util} from '../WizardUtil'
import { FormCheckbox } from 'components/modal/parts'
import { Field } from 'redux-form'

export default class Checkbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {config} = this.props

    let label
    let width = util.calcWidth(config.width)

    if (config.label !== null) {
      label = this.props.buildLabel(config.label)
      width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
    }

    const field = (
      <div className={`col-md-${width}`} style={util.convertStyle(config.style)}>
        <label className="control-label">
          <Field name={config.name} component={FormCheckbox} type="checkbox" label={label} className={config.cls}/>
        </label>
      </div>
    )

    return util.wrapInputs(field, config.useColumn)
  }
}

Checkbox.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
