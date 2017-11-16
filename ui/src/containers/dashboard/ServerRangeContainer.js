import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import ServerRange from 'components/dashboard/main/server/ServerRange'

import {
  scanRange
} from 'actions'

class ServerRangeContainer extends React.Component {
  render () {
    return (
      <ServerRange {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices
  }), {
    scanRange
  }
)(withRouter(ServerRangeContainer))
