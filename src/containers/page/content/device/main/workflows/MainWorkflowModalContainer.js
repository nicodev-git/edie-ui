import React from 'react'
import MainWorkflowModal from '../../../../../../components/page/content/device/main/workflows/MainWorkflowModal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { closeDeviceWorkflowModal, addDeviceWorkflow, updateDeviceWorkflow } from '../../../../../../actions'

@connect(
  state => ({
    editWorkflow: state.devices.editWorkflow,
    ruleModalOpen: state.devices.ruleModalOpen,
    initialValues: state.devices.editWorkflow
  }), {
    closeDeviceWorkflowModal, addDeviceWorkflow, updateDeviceWorkflow
  }
)
@withRouter
export default class MainWorkflowModalContainer extends React.Component {
  render () {
    return (
      <MainWorkflowModal {...this.props} />
    )
  }
}
