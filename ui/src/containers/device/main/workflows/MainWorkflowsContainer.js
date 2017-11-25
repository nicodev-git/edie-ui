import React from 'react'
import MainWorkflows from 'components/dashboard/map/device/main/workflows/MainWorkflows'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  openDeviceWorkflowModal,
  fetchDeviceWorkflows,
  removeDeviceWorkflow,

  addDeviceWorkflow,
  updateDeviceWorkflow,

  fetchWorkflowCategories,
  fetchWorkflows,
  openSysWorkflowsModal,
  closeSysWorkflowsModal,
  selectSysWorkflow,
  deselectSysWorkflow,
  addDeviceWorkflows,
  selectSysWorkflowCategory
} from 'actions'

class MainRulesContainer extends React.Component {
  render () {
    return (
      <MainWorkflows {...this.props} />
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    workflows: state.devices.workflows,
    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw,

    workflowCategories: state.devices.workflowCategories,

    sysWorkflows: state.settings.workflows,
    sysWorkflowsModalOpen: state.devices.sysWorkflowsModalOpen,
    selectedSysWorkflows: state.devices.selectedSysWorkflows,
    selectedSysWorkflowCategory: state.devices.selectedSysWorkflowCategory
  }), {
    openDeviceWorkflowModal,
    fetchDeviceWorkflows,
    removeDeviceWorkflow,

    addDeviceWorkflow,
    updateDeviceWorkflow,

    fetchWorkflowCategories,
    fetchWorkflows,
    openSysWorkflowsModal,
    closeSysWorkflowsModal,
    selectSysWorkflow,
    deselectSysWorkflow,
    addDeviceWorkflows,
    selectSysWorkflowCategory
  }
)(withRouter(MainRulesContainer))
