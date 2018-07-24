import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import SimulationModalView from './SimulationModalView'
import {showAlert} from 'components/common/Alert'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchTestGroups()
    this.props.fetchTestCases()
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


  //////////////////////////////////////////////////////////////

  onClickAddGroup () {
    const name = prompt('Please type test group name')
    if (!name) return
    this.props.addTestGroup(name)
  }

  //////////////////////////////////////////////////////////////

  renderAdvanced () {
    return null
  }
  render () {
    const {
      handleSubmit, onClickClose, collectors, wfSimulationState,
      testGroups
    } = this.props
    return (
      <SimulationModalView
        wfSimulationState={wfSimulationState}
        collectors={collectors}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}

        testGroups={testGroups}
        onClickAddGroup={this.onClickAddGroup.bind(this)}
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