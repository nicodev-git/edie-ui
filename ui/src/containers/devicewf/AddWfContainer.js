import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import AddWf from 'components/devicewf/AddWf'

import {
  fetchWorkflowCategories,
  fetchWorkflows,

  selectSysWorkflow,
  deselectSysWorkflow
} from 'actions'
class AddWfContainer extends React.Component {
  render () {
    return (
      <AddWf
        {...this.props}
      />
    )
  }
}

export default connect(
  state => ({
    devices: state.devices.devices,

    workflowCategories: state.devices.workflowCategories,

    sysWorkflows: state.settings.workflows,
    selectedSysWorkflows: state.devices.selectedSysWorkflows
  }), {
    fetchWorkflowCategories,
    fetchWorkflows,

    selectSysWorkflow,
    deselectSysWorkflow
  }
)(withRouter(AddWfContainer))
