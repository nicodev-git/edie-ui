import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import ServerDetail from 'components/dashboard/serverdetail/ServerDetail'

import {
  fetchDevicesGroups,
  fetchDevice,
  fetchDeviceBySlug,
  openDevice
} from 'actions'

class ServerDetailContainer extends React.Component {
  render () {
    return (
      <ServerDetail {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices
  }), {
    fetchDevicesGroups,
    fetchDevice,
    fetchDeviceBySlug,
    openDevice
  }
)(withRouter(ServerDetailContainer))
