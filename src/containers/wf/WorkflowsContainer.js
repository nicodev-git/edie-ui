import React from 'react'
import {connect} from 'react-redux'

import Workflows from 'components/sidebar/wf/Workflows'

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

  showWfSimulationModal,
  simulateWfMessage,
  fetchCollectors,

  fetchSimSamples,
  addSimSample,
  removeSimSample,

  fetchTestGroups,
  addTestGroup,
  updateTestGroup,

  fetchTestCases,
  addTestCase,
  updateTestCase,
  removeTestCase,

  showGroupModal,
  addGroup,
  updateGroup,
  removeGroup,

  fetchVendorProducts,
  fetchProductTypes,
  fetchProductVendors,

  fetchGlobalVars
} from 'actions'

class WorkflowsContainer extends React.Component {
  render() {
    return (
      <Workflows {...this.props}/>
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
    groupModalOpen: state.workflow.groupModalOpen,
    editGroup: state.workflow.editGroup,

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

    brainCells: state.settings.brainCells,
    collectors: state.settings.collectors,

    vendorProducts: state.settings.vendorProducts,
    productTypes: state.settings.productTypes,
    productVendors: state.settings.productVendors,

    globalVars: state.workflow.globalVars
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

    showWfSimulationModal,
    simulateWfMessage,
    fetchCollectors,

    fetchSimSamples,
    addSimSample,
    removeSimSample,

    fetchTestGroups,
    addTestGroup,
    updateTestGroup,

    fetchTestCases,
    addTestCase,
    updateTestCase,
    removeTestCase,

    showGroupModal,
    addGroup,
    updateGroup,
    removeGroup,

    fetchVendorProducts,
    fetchProductTypes,
    fetchProductVendors,

    fetchGlobalVars
  }
)(WorkflowsContainer)
