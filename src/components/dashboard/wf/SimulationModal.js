import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import SimulationModalView from './SimulationModalView'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onSubmit (values) {
    const {onSubmit} = this.props
    if (!values.text) return alert('Please input text')
    if (!values.connectorId) return alert('Please choose connector')

    onSubmit(values)
  }
  render () {
    const {handleSubmit, onClickClose, collectors} = this.props
    return (
      <SimulationModalView
        collectors={collectors}
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