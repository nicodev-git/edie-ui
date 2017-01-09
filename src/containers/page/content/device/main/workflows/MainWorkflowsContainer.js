import React from 'react'
import MainWorkflows from '../../../../../../components/page/content/device/main/workflows/MainWorkflows'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { fetchDeviceWorkflows, openWorkflowModal } from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    workflows: state.devices.workflows,
    workflowModalOpen: state.devices.workflowModalOpen
  }),
    {
        openWorkflowModal,
        fetchDeviceWorkflows,
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

MainRulesContainer.defaultProps = {
  onUpdateCategory: null
}
