import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import AddWf from 'components/devicewf/AddWf'

import {
  fetchDevices,
  fetchWorkflow,
  setWorkflow,

  openDeviceWorkflowModal
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
    editWorkflow: state.devices.editWorkflow,

    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw
  }), {
    fetchDevices,
    fetchWorkflow,
    setWorkflow,

    openDeviceWorkflowModal
  }
)(withRouter(AddWfContainer))
