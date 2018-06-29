import React from 'react'
import {connect} from 'react-redux'

import Workflows from 'components/dashboard/wf/Workflows'

import {
  openDeviceWfDiagramModal,
  closeDeviceWfDiagramModal,
  fetchWorkflows,
  selectWorkflow,
  showWfNameModal,
  addWorkflow,
  updateWorkflow,
  removeWorkflow,

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
  fetchCollectors
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

    groups: state.workflow.groups,

    users: state.dashboard.users,
    userPickModalOpen: state.workflow.userPickModalOpen,

    userInfo: state.dashboard.userInfo,

    shapes: state.workflow.shapes,

    wfSettingModalOpen: state.workflow.wfSettingModalOpen,
    editWfSetting: state.workflow.editWfSetting,
    wfSimulationModalOpen: state.workflow.wfSimulationModalOpen,

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
    fetchCollectors
  }
)(WorkflowsContainer)
