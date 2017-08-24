import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import LogView from 'components/dashboard/main/LogView'

class LogViewContainer extends React.Component {
  render () {
    return (
      <LogView {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.deviceAndGroups
  }), {

  }
)(withRouter(LogViewContainer))
