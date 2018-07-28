import React from 'react'
import {find} from 'lodash'

import WfTestView from './WfTestView'
import {showAlert} from 'components/common/Alert'

import TestCaseModal from './TestCaseModal'
import IconParam from '@material-ui/icons/Input'
// import IconGroup from "@material-ui/icons/GroupWork";
// import {deepPurple, purple} from "@material-ui/core/colors";
// import IconWork from "@material-ui/icons/Work";

export default class WfTest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      testCaseModalOpen: false,
      selectedCaseId: null,
      selectedGroupId: null
    }

    this.mainMenuItems = [{
      label: 'Add Test Case',
      icon: <IconParam/>,
      onClick: this.onClickAddCase.bind(this)
    }]
  }

  componentWillMount () {
    this.props.fetchTestGroups()
    this.props.fetchTestCases()
  }

  componentDidUpdate(props) {
    const {wfSimulationRes, testGroups} = this.props
    if (!props.wfSimulationRes && wfSimulationRes) {
      showAlert(wfSimulationRes)
    }
    if (!this.state.selectedGroupId && testGroups.length) {
      this.setState({
        selectedGroupId: testGroups[0].id
      })
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

  onClickEditGroup () {
    const {selectedGroupId} = this.state
    if (!selectedGroupId) return

    const group = find(this.props.testGroups, {id: selectedGroupId})
    if (!group) return
    const name = prompt('Please type test group name', group.name)
    if (!name) return

    this.props.updateTestGroup({
      ...group,
      name
    })
  }

  selectGroupId (e) {
    this.setState({
      selectedGroupId: e.target.value
    })
  }

  //////////////////////////////////////////////////////////////

  onClickAddCase () {
    const {selectedGroupId} = this.state
    if (!selectedGroupId) return alert('Please choose test group')

    this.setState({
      testCaseModalOpen: false,
      selectedCaseId: null
    }, () => {
      this.onClickEditCase({})
    })
  }

  onClickEditCase (editCase) {
    this.setState({
      testCaseModalOpen: true,
      editCase
    })
  }

  onClickDeleteCase (entity) {
    if (!window.confirm('Click OK to delete')) return
    this.props.removeTestCase(entity)
    this.setState({
      selectedCaseId: null,
    })

    this.onCloseTestCase()
  }

  onSaveTestCase (entity) {
    if (entity.id) {
      this.props.updateTestCase(entity)
    } else {
      const {selectedGroupId} = this.state
      entity.groupId = selectedGroupId
      this.props.addTestCase(entity)
      this.onCloseTestCase()
    }
  }

  onCloseTestCase () {
    this.setState({
      testCaseModalOpen: false
    })
  }

  onClickPost (messages) {
    if (!messages || !messages.length) return alert('No message')

    this.props.simulateWfMessage(messages)
  }

  selectCaseId (selectedCase) {
    this.setState({
      selectedCaseId: selectedCase.id
    })

    this.setState({
      testCaseModalOpen: false
    }, () => {
      this.onClickEditCase(selectedCase)
    })

  }

  //////////////////////////////////////////////////////////////

  renderTestCaseModal () {
    const {submitForm} = this.props
    if (!this.state.testCaseModalOpen) return null
    return (
      <TestCaseModal
        noModal
        editCase={this.state.editCase}
        submitForm={submitForm}
        onSubmit={this.onSaveTestCase.bind(this)}
        onClickPost={this.onClickPost.bind(this)}
        onClickClose={this.onCloseTestCase.bind(this)}
      />
    )
  }

  render () {
    return (
      <WfTestView
        {...this.props}
        mainMenuItems={this.mainMenuItems}

        selectedGroupId={this.state.selectedGroupId}
        selectGroupId={this.selectGroupId.bind(this)}
        onClickAddGroup={this.onClickAddGroup.bind(this)}
        onClickEditGroup={this.onClickEditGroup.bind(this)}

        onClickAddCase={this.onClickAddCase.bind(this)}
        onClickEditCase={this.onClickEditCase.bind(this)}
        onClickDeleteCase={this.onClickDeleteCase.bind(this)}
        selectedCaseId={this.state.selectedCaseId}
        selectCaseId={this.selectCaseId.bind(this)}
        caseModal={this.renderTestCaseModal()}
      >
      </WfTestView>
    )
  }
}