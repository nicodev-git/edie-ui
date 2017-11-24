import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import DeviceWf from 'components/devicewf/DeviceWf'

import {
  fetchDevices,

  openDeviceWorkflowModal
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

    workflowModalOpen: state.devices.workflowModalOpen,
    workflowListDraw: state.devices.workflowListDraw
  }), {
    fetchDevices,

    openDeviceWorkflowModal
  }
)(withRouter(DeviceWfContainer))
