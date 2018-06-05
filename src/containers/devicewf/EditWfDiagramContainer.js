import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import EditWfDiagram from 'components/devicewf/EditWfDiagram'

import {
  fetchWorkflow,
  setWorkflow,

  openDeviceWfDiagramModal,
  updateDeviceWorkflow
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
    editWorkflow: state.devices.editWorkflow,

    wfDiagramModalOpen: state.devices.wfDiagramModalOpen
  }), {
    fetchWorkflow,
    setWorkflow,

    openDeviceWfDiagramModal,
    updateDeviceWorkflow
  }
)(withRouter(EditWfDiagramContainer))
