import React from 'react'
import MainWorkflows from '../../../../../../components/page/content/device/main/workflows/MainWorkflows'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchDeviceWorkflows, openDeviceWorkflowModal, removeDeviceWorkflow } from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    workflows: state.devices.workflows,
    workflowModalOpen: state.devices.workflowModalOpen
  }), {
    openDeviceWorkflowModal,
    fetchDeviceWorkflows,
    removeDeviceWorkflow
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
