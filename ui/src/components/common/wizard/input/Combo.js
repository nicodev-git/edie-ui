import React from 'react'
import { util } from '../WizardUtil'

import {FormSelect} from 'components/modal/parts'

export default class Combo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.comboOptions = (props.config.items || []).map(p => ({
      label: p.display || '',
      value: p.value || ''
    }))
  }
  // render1 () {
  //   let config = this.props.config
  //   let values = this.props.values
  //
  //   let label, input
  //   let width = util.calcWidth(config.width)
  //
  //   if (config.label !== null) {
  //     if (config.label.type === 'place') {
  //
  //     } else {
  //       label = this.props.buildLabel(config.label)
  //       width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
  //     }
  //   }
  //
  //   let defaultValue = config.value
  //
  //   let options = this.state.options.map(item => {
  //     if (item.selected && !defaultValue) defaultValue = item.value
  //     return {
  //       text: item.label,
  //       value: item.value
  //     }
  //   })
  //
  //   if (config.name && values[config.name] !== undefined) {
  //     defaultValue = values[config.name]
  //   }
  //
  //   if (!defaultValue && options.length) {
  //     defaultValue = options[0].value
  //   }
  //
  //   input = (
  //     <div className={`col-md-${width}`}
  //       style={util.convertStyle(config.style)}>
  //       <SelectField className={`form-control ${config.cls || ''}`}
  //         name={config.name}
  //         validation={config.required ? 'required' : null}
  //         defaultValue={defaultValue}
  //         options={options}
  //       />
  //       {this.renderSidebar()}
  //     </div>
  //   )
  //
  //   return util.wrapInputs(label, input, config['useColumn'])
  // }
  render () {
    const {config} = this.props
    return (
      <Field
        name={config.name}
        label={''}
        component={FormSelect}
        style={config.style}
        onChange={onChange}
        className={config.cls}
        disabled={config.disabled}
        options={this.comboOptions}
      />
    )
  }
}

Combo.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
