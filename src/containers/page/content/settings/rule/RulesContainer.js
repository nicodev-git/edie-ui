import React from 'react'
import Rules from '../../../../../components/page/content/settings/rule/Rules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWorkflows, openWorkflowModal, removeWorkflow } from '../../../../../actions'

@connect(
  state => ({
    workflows: state.settings.workflows,
    workflowModalVisible: state.settings.workflowModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchWorkflows,
      openWorkflowModal,
      removeWorkflow
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
