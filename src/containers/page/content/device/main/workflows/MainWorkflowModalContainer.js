import React from 'react'
import MainWorkflowModal from '../../../../../../components/page/content/device/main/workflows/MainWorkflowModal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { assign } from 'lodash'

import {
  closeDeviceWorkflowModal,
  addDeviceWorkflow,
  updateDeviceWorkflow,
  fetchWorkflowCategories,
  openDeviceRuleModal,
  openWfCategoryModal
} from '../../../../../../actions'

@connect(
  state => ({
    editWorkflow: state.devices.editWorkflow,
    workflowCategories: state.devices.workflowCategories,
    ruleModalOpen: state.devices.ruleModalOpen,
    wfCategoryModalOpen: state.devices.wfCategoryModalOpen,
    initialValues: assign({
      enable: true,
      severity: 'HIGH'
    }, state.devices.editWorkflow)
  }), {
    closeDeviceWorkflowModal,
    addDeviceWorkflow,
    updateDeviceWorkflow,
    fetchWorkflowCategories,
    openDeviceRuleModal,
    openWfCategoryModal
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
