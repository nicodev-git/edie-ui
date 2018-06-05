import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import EditWf from 'components/devicewf/EditWf'

import {
  fetchDevices,
  fetchWorkflow,
  setWorkflow,

  openDeviceWorkflowModal
} from 'actions'
class EditWfContainer extends React.Component {
  render () {
    return (
      <EditWf
        {...this.props}
      />
    )
  }
}

export default connect(
  state => ({
    devices: state.devices.devices,
    editWorkflow: state.devices.editWorkflow,

    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw
  }), {
    fetchDevices,
    fetchWorkflow,
    setWorkflow,

    openDeviceWorkflowModal
  }
)(withRouter(EditWfContainer))
