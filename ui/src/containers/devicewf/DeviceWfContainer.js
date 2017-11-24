import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import DeviceWf from 'components/devicewf/DeviceWf'

import {
  fetchDevices
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
    devices: state.devices.devices
  }), {
    fetchDevices
  }
)(withRouter(DeviceWfContainer))
