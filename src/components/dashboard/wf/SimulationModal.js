import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import SimulationModalView from './SimulationModalView'
import {showAlert} from 'components/common/Alert'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 'simple'
    }
  }

  componentDidUpdate(props) {
    const {wfSimulationRes} = this.props
    if (!props.wfSimulationRes && wfSimulationRes) {
      showAlert(wfSimulationRes)
    }
  }

  onSubmit (values) {
    const {onSubmit} = this.props
    if (!values.text) return alert('Please input text')
    if (!values.connectorId) return alert('Please choose connector')

    onSubmit(values)
  }

  onChangeTab () {

  }

  renderAdvanced () {
    return null
  }
  render () {
    const {handleSubmit, onClickClose, collectors, wfSimulationState} = this.props
    return (
      <SimulationModalView
        wfSimulationState={wfSimulationState}
        collectors={collectors}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}

        tab={this.state.tab}
        onChangeTab={this.onChangeTab.bind(this)}
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