import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import DeviceWf from 'components/devicewf/DeviceWf'

import {
  fetchDevices,

  openDeviceWorkflowModal,
  removeWorkflow,

  updateMapDevice
} from 'actions'
class DeviceWfContainer extends React.Component {
  render () {
    return (
      <DeviceWf {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    devices: state.devices.devices,
    userInfo: state.dashboard.userInfo,

    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw,
    workflowDraw: state.settings.workflowDraw
  }), {
    fetchDevices,

    openDeviceWorkflowModal,
    removeWorkflow,

    updateMapDevice
  }
)(withRouter(DeviceWfContainer))
