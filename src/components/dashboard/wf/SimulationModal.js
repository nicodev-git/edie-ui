import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {keys, findIndex} from 'lodash'

import SimulationModalView from './SimulationModalView'
import {mappingFieldOptions} from 'shared/Global'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)

    const {mapping} = props.workflow
    const fields = []
    let id = 0
    keys(mapping || {}).forEach(key => {
      fields.push({
        id,
        key,
        value: mapping[key]
      })
      id++
    })

    if (!fields.length) {
      fields.push({
        id: 0
      })
    }

    this.state = {
      fields
    }
  }

  componentDidMount () {
    const {fields} = this.state
    fields.forEach(f => {
      if (f.key) this.props.change(`mapping.from${f.id}`, f.key)
      if (f.value) {
        if (findIndex(mappingFieldOptions, {value: f.value}) >= 0) {
          this.props.change(`mapping.existing${f.id}`, f.value)
        } else {
          this.props.change(`mapping.to${f.id}`, f.value)
        }
      }
    })
  }

  onClickDelete (id) {
    const {fields} = this.state
    this.setState({
      fields: fields.filter(p => p.id !== id)
    })
  }
  onClickAdd () {
    const {fields} = this.state

    const maxId = Math.max.apply(null, fields.map(p => p.id)) + 1
    this.setState({
      fields: [...fields, {
        id: maxId
      }]
    })
  }

  onSubmit (values) {
    const {fields} = this.state
    const {onSave} = this.props

    const mapping = {}

    fields.forEach(p => {
      const key = `from${p.id}`
      if (values.mapping[key]) {
        const id = key.replace('from', '')
        let value = values.mapping[`existing${id}`]
        if (value === '[Other]') value = values.mapping[`to${id}`]
        mapping[values.mapping[key]] = value
      }
    })

    onSave(mapping)
  }
  render () {
    const {handleSubmit, onClickClose} = this.props
    return (
      <SimulationModalView
        fields={this.state.fields}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
        onClickClose={onClickClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {
    }
  })
)(reduxForm({form: 'wfSimulationForm'})(SimulationModal))