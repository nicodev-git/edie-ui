import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import SimulationModalView from './SimulationModalView'
import {showAlert} from 'components/common/Alert'

import TestCaseModal from './TestCaseModal'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      testCaseModalOpen: false,
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
    this.props.addTestGroup({name})
  }

  //////////////////////////////////////////////////////////////

  onClickAddCase () {
    const {groupId} = this.props.allValues || {}
    if (!groupId) return alert('Please choose test group')
    // const name = prompt('Please type test case name')
    // if (!name) return
    //
    //
    // this.props.addTestCase({
    //   name,
    //   groupId
    // }, data => {
    //   if (!data) return
    //   this.props.change('testCaseId', data.id)
    // })
    this.setState({
      testCaseModalOpen: true,
      editTestCase: null
    })
  }

  onClickEditCase (editTestCase) {
    this.setState({
      testCaseModalOpen: true,
      editTestCase
    })
  }

  onclickDeleteCase (entity) {
    if (!window.confirm('Click OK to delete')) return
    this.props.removeTestCase(entity)
  }

  onSaveTestCase (entity) {
    if (entity.id) {
      this.props.updateTestCase(entity)
    } else {
      const {groupId} = this.props.allValues || {}
      entity.groupId = groupId
      this.props.addTestCase(entity)
    }
    this.setState({
      testCaseModalOpen: false
    })
  }

  onCloseTestCase () {
    this.setState({
      testCaseModalOpen: false
    })
  }

  //////////////////////////////////////////////////////////////

  renderTestCaseModal () {
    if (!this.state.testCaseModalOpen) return null
    return (
      <TestCaseModal
        editCase={this.state.editCase}
        onSubmit={this.onSaveTestCase.bind(this)}
        onClickClose={this.onCloseTestCase.bind(this)}
      />
    )
  }

  render () {
    const {
      handleSubmit, onClickClose, collectors, wfSimulationState,
      testGroups, testCases, allValues
    } = this.props
    return (
      <SimulationModalView
        allValues={allValues}
        wfSimulationState={wfSimulationState}
        collectors={collectors}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}

        testGroups={testGroups}
        onClickAddGroup={this.onClickAddGroup.bind(this)}

        testCases={testCases}
        onClickAddCase={this.onClickAddCase.bind(this)}
        onClickEditCase={this.onClickEditCase.bind(this)}
        onClickDeleteCase={this.onclickDeleteCase.bind(this)}
      >
        {this.renderTestCaseModal()}
      </SimulationModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {},
    allValues: getFormValues('wfSimulationForm')(state)
  })
)(reduxForm({form: 'wfSimulationForm'})(SimulationModal))