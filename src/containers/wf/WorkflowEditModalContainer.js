import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import WorkflowEditModal from 'components/sidebar/wf/WorkflowEditModal'

import {
  openDeviceWfDiagramModal,
  closeDeviceWfDiagramModal,
  fetchWorkflows,
  selectWorkflow,
  showWfNameModal,
  addWorkflow,
  updateWorkflow,
  removeWorkflow,
  fetchWorkflowByName,

  fetchGroups,
  fetchDevices,

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

  showBrainCellModal,
  addBrainCell,
  updateBrainCell,
  fetchBrainCells,
  showScriptModal,
  showGrokModal,
  showCellParamModal,

  resetForm
} from 'actions'

class WorkflowEditContainer extends React.Component {
  render() {
    return (
      <WorkflowEditModal{...this.props}/>
    )
  }
}

export default connect(
  state => ({
    devices: state.devices.devices,
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

    brainCells: state.settings.brainCells,
    brainCellModalOpen: state.settings.brainCellModalOpen,
    editBrainCell: state.settings.editBrainCell,
    scriptModalOpen: state.settings.scriptModalOpen,
    grokModalOpen: state.settings.grokModalOpen,
    editCellParam: state.settings.editCellParam,
    cellParamModalOpen: state.settings.cellParamModalOpen,
  }), {
    openDeviceWfDiagramModal,
    closeDeviceWfDiagramModal,
    fetchWorkflows,
    selectWorkflow,
    showWfNameModal,
    addWorkflow,
    updateWorkflow,
    removeWorkflow,
    fetchWorkflowByName,

    fetchGroups,
    fetchDevices,

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

    showBrainCellModal,
    addBrainCell,
    updateBrainCell,
    fetchBrainCells,
    showScriptModal,
    showGrokModal,
    showCellParamModal,

    resetForm
  }
)(withRouter(WorkflowEditContainer))
