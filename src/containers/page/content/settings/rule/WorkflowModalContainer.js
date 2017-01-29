import React from 'react'
import WorkflowModal from '../../../../../components/page/content/settings/rule/WorkflowModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchWorkflows, addWorkflow, updateWorkflow, closeWorkflowModal, fetchWorkflowCategories } from '../../../../../actions'

@connect(
  state => ({
    editWorkflow: state.settings.editWorkflow,
    workflowCategories: state.devices.workflowCategories,
    initialValues: state.settings.editWorkflow
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchWorkflows,
      addWorkflow,
      updateWorkflow,
      closeWorkflowModal,
      fetchWorkflowCategories
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
