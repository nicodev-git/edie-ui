import React from 'react'
import {connect} from 'react-redux'

import WfTest from 'components/sidebar/wf/simulation/WfTest'

import {
  openDeviceWfDiagramModal,
  closeDeviceWfDiagramModal,
  fetchWorkflows,
  selectWorkflow,
  showWfNameModal,
  addWorkflow,
  updateWorkflow,
  removeWorkflow,

  fetchDevices,
  fetchGroups,

  addFlowItem,
  updateFlowItem,
  updateFlowItems,
  removeFlowItem,
  addFlowLine,
  updateFlowLine,
  moveFlowItems,
  changeFlowItemFill,

  showWfRuleModal,
  showWfTaskModal,

  showUserPickModal,

  fetchShapes,

  showWfSettingModal,
  fetchWfSetting,
  saveWfSetting,

  addBrainCell,
  fetchBrainCells,
  resetForm,
  submitForm,

  showWfSimulationModal,
  simulateWfMessage,
  fetchCollectors,

  fetchSimSamples,
  addSimSample,
  removeSimSample,

  fetchTestGroups,
  addTestGroup,
  updateTestGroup,
  removeTestGroup,

  fetchTestCases,
  addTestCase,
  updateTestCase,
  removeTestCase,
  fetchTestIncidents
} from 'actions'

class WfTestContainer extends React.Component {
  render() {
    return (
      <WfTest {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    wfDiagramModalOpen: state.workflow.wfDiagramModalOpen,

    workflows: state.workflow.workflows,
    diagrams: state.workflow.diagrams,
    selectedWorkflow: state.workflow.selectedWorkflow,

    wfTaskModalOpen: state.workflow.wfTaskModalOpen,
    wfRuleModalOpen: state.workflow.wfRuleModalOpen,

    wfNameModalOpen: state.workflow.wfNameModalOpen,

    devices: state.devices.devices,
    groups: state.workflow.groups,

    users: state.dashboard.users,
    userPickModalOpen: state.workflow.userPickModalOpen,

    userInfo: state.dashboard.userInfo,

    shapes: state.workflow.shapes,

    wfSettingModalOpen: state.workflow.wfSettingModalOpen,
    editWfSetting: state.workflow.editWfSetting,
    wfSimulationModalOpen: state.workflow.wfSimulationModalOpen,
    simSamples: state.workflow.simSamples,
    wfSimulationState: state.workflow.wfSimulationState,
    wfSimulationRes: state.workflow.wfSimulationRes,

    testGroups: state.workflow.testGroups,
    testCases: state.workflow.testCases,
    testIncidents: state.workflow.testIncidents,

    brainCells: state.settings.brainCells,
    collectors: state.settings.collectors
  }), {
    openDeviceWfDiagramModal,
    closeDeviceWfDiagramModal,
    fetchWorkflows,
    selectWorkflow,
    showWfNameModal,
    addWorkflow,
    updateWorkflow,
    removeWorkflow,

    fetchDevices,
    fetchGroups,

    addFlowItem,
    updateFlowItem,
    updateFlowItems,
    removeFlowItem,
    addFlowLine,
    updateFlowLine,
    moveFlowItems,
    changeFlowItemFill,

    showWfRuleModal,
    showWfTaskModal,

    showUserPickModal,

    fetchShapes,

    showWfSettingModal,
    fetchWfSetting,
    saveWfSetting,

    addBrainCell,
    fetchBrainCells,
    resetForm,
    submitForm,

    showWfSimulationModal,
    simulateWfMessage,
    fetchCollectors,

    fetchSimSamples,
    addSimSample,
    removeSimSample,

    fetchTestGroups,
    addTestGroup,
    updateTestGroup,
    removeTestGroup,

    fetchTestCases,
    addTestCase,
    updateTestCase,
    removeTestCase,
    fetchTestIncidents
  }
)(WfTestContainer)
