import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {keys, findIndex} from 'lodash'

import SimulationModalView from './SimulationModalView'
import {mappingFieldOptions} from 'shared/Global'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
    if (!values.text) return alert('Please input text')
    console.log(values)
  }
  render () {
    const {handleSubmit, onClickClose} = this.props
    return (
      <SimulationModalView
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
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