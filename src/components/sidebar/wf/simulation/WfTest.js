import React from 'react'
import {find} from 'lodash'

import WfTestView from './WfTestView'
import {showAlert} from 'components/common/Alert'

import TestCaseModal from './TestCaseModal'
import IconParam from '@material-ui/icons/Input'
import {messageTypes} from 'shared/SimulationMessages'
import TestGroupModal from "./TestGroupModal";

export default class WfTest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      testCaseModalOpen: false,
      selectedCaseId: null,
      selectedGroupId: null,

      testGroupModalOpen: false,
      editGroup: null,
      incidentDraw: 1
    }

    this.mainMenuItems = [{
      label: 'Add Test Case',
      icon: <IconParam/>,
      onClick: this.onClickAddCase.bind(this)
    }]
  }

  componentWillMount () {
    this.props.fetchCollectors()
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

  getSelectedGroup () {
    const {selectedGroupId} = this.state
    if (!selectedGroupId) return
    const group = find(this.props.testGroups, {id: selectedGroupId})
    return group
  }

  onClickAddGroup () {
    this.setState({
      testGroupModalOpen: true,
      editGroup: null
    })
  }

  onClickEditGroup () {
    const group = this.getSelectedGroup()
    if (!group) return

    this.setState({
      testGroupModalOpen: true,
      editGroup: group
    })
  }

  onClickDeleteGroup () {
    const {testGroups} = this.props
    const group = this.getSelectedGroup()
    if (!group) return

    if (!window.confirm('Click OK to remove group')) return

    this.props.removeTestGroup(group)

    const found = testGroups.filter(p => p.id !== group.id)[0]
    this.setState({
      selectedGroupId: found ? found.id : ''
    })

    this.clearCaseSelection()
  }

  selectGroupId (e) {
    this.setState({
      selectedGroupId: e.target.value
    })

    this.clearCaseSelection()
  }

  onSaveTestGroup (entity) {
    const {editGroup} = this.state
    if (editGroup) {
      this.props.updateTestGroup({
        ...editGroup,
        ...entity
      })
    } else {
      this.props.addTestGroup(entity)
    }

    this.onCloseTestGroup()
  }

  onCloseTestGroup () {
    this.setState({
      testGroupModalOpen: false
    })
  }

  //////////////////////////////////////////////////////////////

  clearCaseSelection() {
    this.setState({
      testCaseModalOpen: false,
      selectedCaseId: null
    })
  }

  onClickAddCase () {
    const {selectedGroupId} = this.state
    if (!selectedGroupId) return alert('Please choose test group')

    this.setState({
      testCaseModalOpen: false,
      selectedCaseId: null
    }, () => {
      //this.onClickEditCase({})

      const name = prompt('Please type name')
      if (!name) return
      const {selectedGroupId} = this.state
      const entity = {
        name,
        groupId: selectedGroupId,
        messages: []
      }
      this.props.addTestCase(entity)
    })
  }

  onClickEditCase (editCase) {
    this.setState({
      testCaseModalOpen: true,
      editCase
    })
  }

  onClickDeleteCase (entity, e) {
    e.preventDefault()
    if (!window.confirm('Click OK to delete')) return false
    this.props.removeTestCase(entity)
    this.clearCaseSelection()
    return false
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

  onClickPost (testCase) {
    const {messages} = testCase
    if (!messages || !messages.length) return alert('No message')
    const group = this.getSelectedGroup()

    var entities = []
    messages.forEach(p => {
      const tpl = find(messageTypes, {name: p.typeName})
      if (!tpl) return

      let json = tpl.json
      tpl.data.forEach(k => {
        json = json.replace(new RegExp('\\$\\{' + k.key + '\\}', 'g'), p.values[k.key])
      })

      try {
          const entity = JSON.parse(json)
          if (entity) entities.push(entity)
      } catch (e) {
        console.log(e)
        return alert('Invalid values typed')
      }
    })

    console.log(entities)
    this.props.simulateWfMessage(group.type, entities, true)
    // setTimeout(this.props.fetchTestIncidents, 3000)
  }

  onClickRefreshIncidents () {

  }

  selectCaseId (selectedCase, e) {
    e.preventDefault()
    this.setState({
      selectedCaseId: selectedCase.id
    })

    this.setState({
      testCaseModalOpen: false
    }, () => {
      this.onClickEditCase(selectedCase)
    })

    return false
  }

  //////////////////////////////////////////////////////////////

  renderTestCaseModal () {
    const {submitForm, testGroups, collectors} = this.props
    if (!this.state.testCaseModalOpen) return null
    return (
      <TestCaseModal
        noModal
        editCase={this.state.editCase}
        testGroups={testGroups}
        submitForm={submitForm}
        onSubmit={this.onSaveTestCase.bind(this)}
        onClickClose={this.onCloseTestCase.bind(this)}

        connectors={collectors}
      />
    )
  }

  renderGroupModal () {
    if (!this.state.testGroupModalOpen) return null
    return (
      <TestGroupModal
        editGroup={this.state.editGroup}
        onSubmit={this.onSaveTestGroup.bind(this)}
        onClickClose={this.onCloseTestGroup.bind(this)}
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
        onClickDeleteGroup={this.onClickDeleteGroup.bind(this)}

        onClickAddCase={this.onClickAddCase.bind(this)}
        onClickEditCase={this.onClickEditCase.bind(this)}
        onClickDeleteCase={this.onClickDeleteCase.bind(this)}
        selectedCaseId={this.state.selectedCaseId}
        selectCaseId={this.selectCaseId.bind(this)}
        caseModal={this.renderTestCaseModal()}

        onClickPost={this.onClickPost.bind(this)}
        incidentDraw={this.state.incidentDraw}
        onClickRefreshIncidents={this.onClickRefreshIncidents.bind(this)}
      >
        {this.renderGroupModal()}
      </WfTestView>
    )
  }
}