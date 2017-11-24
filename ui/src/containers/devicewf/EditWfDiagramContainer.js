import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import EditWfDiagram from 'components/devicewf/EditWfDiagram'

import {
  fetchWorkflow,
  setWorkflow,

  openDeviceWorkflowModal
} from 'actions'
class EditWfDiagramContainer extends React.Component {
  render () {
    return (
      <EditWfDiagram
        {...this.props}
      />
    )
  }
}

export default connect(
  state => ({
    devices: state.devices.devices,
    editWorkflow: state.devices.editWorkflow
  }), {
    fetchWorkflow,
    setWorkflow,

    openDeviceWorkflowModal
  }
)(withRouter(EditWfDiagramContainer))
