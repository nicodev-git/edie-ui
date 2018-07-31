import React from 'react'
import {find} from 'lodash'

import WfTestView from './WfTestView'
import {showAlert} from 'components/common/Alert'

import TestCaseModal from './TestCaseModal'
import IconParam from '@material-ui/icons/Input'
import {messageTypes} from 'shared/SimulationMessages'

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
    this.props.fetchTestIncidents()
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

  onClickDeleteGroup () {
    const {selectedGroupId} = this.state
    const {testGroups} = this.props
    if (!selectedGroupId) return

    const group = find(testGroups, {id: selectedGroupId})
    if (!group) return

    if (!window.confirm('Click OK to remove group')) return

    this.props.removeTestGroup(group)

    const found = testGroups.filter(p => p.id !== selectedGroupId)[0]
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

    // console.log(entities)
    this.props.simulateWfMessage(entities, true)
    setTimeout(this.props.fetchTestIncidents, 3000)
  }

  onClickRefreshIncidents () {
    this.props.fetchTestIncidents()
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
    const {submitForm} = this.props
    if (!this.state.testCaseModalOpen) return null
    return (
      <TestCaseModal
        noModal
        editCase={this.state.editCase}
        submitForm={submitForm}
        onSubmit={this.onSaveTestCase.bind(this)}
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
        onClickDeleteGroup={this.onClickDeleteGroup.bind(this)}

        onClickAddCase={this.onClickAddCase.bind(this)}
        onClickEditCase={this.onClickEditCase.bind(this)}
        onClickDeleteCase={this.onClickDeleteCase.bind(this)}
        selectedCaseId={this.state.selectedCaseId}
        selectCaseId={this.selectCaseId.bind(this)}
        caseModal={this.renderTestCaseModal()}

        onClickPost={this.onClickPost.bind(this)}
        onClickRefreshIncidents={this.onClickRefreshIncidents.bind(this)}
      >
      </WfTestView>
    )
  }
}