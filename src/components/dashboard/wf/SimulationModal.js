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