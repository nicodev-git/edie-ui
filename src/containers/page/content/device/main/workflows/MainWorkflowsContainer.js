import React from 'react'
import MainWorkflows from '../../../../../../components/page/content/device/main/workflows/MainWorkflows'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  openDeviceWorkflowModal,
  fetchDeviceWorkflows,
  removeDeviceWorkflow,

  closeDeviceWorkflowModal,
  addDeviceWorkflow,
  updateDeviceWorkflow,
  fetchWorkflowCategories,
  openDeviceRuleModal,
  openWfCategoryModal,
  openWfActionModal,
  openDeviceWfDiagramModal
} from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    workflows: state.devices.workflows,
    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw,

    editWorkflow: state.devices.editWorkflow,

    workflowCategories: state.devices.workflowCategories,
    ruleModalOpen: state.devices.ruleModalOpen,
    wfCategoryModalOpen: state.devices.wfCategoryModalOpen,
    wfActionModalOpen: state.devices.wfActionModalOpen,
    wfDiagramModalOpen: state.devices.wfDiagramModalOpen
  }), {
    openDeviceWorkflowModal,
    fetchDeviceWorkflows,
    removeDeviceWorkflow,

    closeDeviceWorkflowModal,
    addDeviceWorkflow,
    updateDeviceWorkflow,
    fetchWorkflowCategories,
    openDeviceRuleModal,
    openWfCategoryModal,
    openWfActionModal,
    openDeviceWfDiagramModal
  }
)
@withRouter
export default class MainRulesContainer extends React.Component {
  render () {
    return (
      <MainWorkflows {...this.props} />
    )
  }
}
