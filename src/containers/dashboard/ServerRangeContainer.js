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
    rangeScanResults: state.dashboard.rangeScanResults,
    scanStatus: state.dashboard.scanStatus
  }), {
    scanRange
  }
)(withRouter(ServerRangeContainer))
