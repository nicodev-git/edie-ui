import React from 'react'
import { Field } from 'redux-form'
import axios from 'axios'

import {FormSelect} from 'components/modal/parts'
import {required} from 'components/modal/validation/CommonValidation'
import {ROOT_URL} from 'actions/config'

export default class Combo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: []
    }
  }

  componentWillMount () {
    const {config} = this.props

    if (config.remote === true) {
      const {url, root, display, value} = config.server
      axios.get(`${ROOT_URL}${url}`).then(res => {
        let {data} = res
        if (root) {
          root.forEach(p => {
            data = data[p]
          })
        }

        const options = (data || []).map(p => ({
          label: p[display] || '',
          value: p[value] || ''
        }))
        this.setState({options})
      })
    } else {
      const options = (config.items || []).map(p => ({
        label: p.display || '',
        value: p.value || ''
      }))
      this.setState({options})
    }
  }
  onChange (e, value) {
    const {onChange} = this.props
    onChange && onChange({
      target: {
        name: this.props.config.name
      }
    }, value)

  }
  render () {
    const {config} = this.props
    const {options} = this.state
    const validate = []
    if (config.required) validate.push(required)
    return (
      <Field
        name={config.name}
        floatingLabel={config.label ? config.label.text : ''}
        component={FormSelect}
        style={config.style}
        className={`valign-top margin-md-right ${config.cls}`}
        disabled={config.disabled}
        options={options}
        // defaultValue={options.length ? options[0].value : null}
        validate={validate}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

Combo.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
