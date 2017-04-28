import React from 'react'
import Rules from 'components/page/content/settings/rule/Rules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchWorkflowCategories,
  fetchWorkflows,
  openWorkflowModal,
  removeWorkflow,
  selectWorkflowCategory,

  addWorkflow,
  updateWorkflow,
  closeWorkflowModal
} from 'actions'

@connect(
  state => ({
    workflows: state.settings.workflows,
    editWorkflow: state.settings.editWorkflow,
    workflowModalVisible: state.settings.workflowModalVisible,
    workflowCategories: state.devices.workflowCategories,
    selectedWorkflowCategory: state.devices.selectedWorkflowCategory
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchWorkflowCategories,
      fetchWorkflows,
      openWorkflowModal,
      removeWorkflow,
      selectWorkflowCategory,

      addWorkflow,
      updateWorkflow,
      closeWorkflowModal
    }, dispatch)
  })
)
export default class RulesContainer extends React.Component {
  render () {
    return (
      <Rules {...this.props} />
    )
  }
}
