import React from 'react'
import WorkflowModal from '../../../../../components/page/content/settings/rule/WorkflowModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchWorkflows,
  addWorkflow,
  updateWorkflow,
  closeWorkflowModal,
  fetchWorkflowCategories,

  openWfCategoryModal,
  closeWfCategoryModal,

  openWfActionModal,
  openDeviceWfDiagramModal

} from '../../../../../actions'

@connect(
  state => ({
    editWorkflow: state.settings.editWorkflow,
    workflowCategories: state.devices.workflowCategories,
    wfCategoryModalOpen: state.devices.wfCategoryModalOpen,
    wfActionModalOpen: state.devices.wfActionModalOpen,
    wfDiagramModalOpen: state.devices.wfDiagramModalOpen,

    initialValues: state.settings.editWorkflow
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchWorkflows,
      addWorkflow,
      updateWorkflow,
      closeWorkflowModal,
      fetchWorkflowCategories,

      openWfCategoryModal,
      closeWfCategoryModal,

      openWfActionModal,
      openDeviceWfDiagramModal
    }, dispatch)
  })
)
export default class WorkflowModalContainer extends React.Component {
  render () {
    return (
      <WorkflowModal {...this.props} />
    )
  }
}

WorkflowModal.defaultProps = {
  credentials: null
}
