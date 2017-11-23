import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Log from 'components/log/Log'

import {
  fetchDevicesGroups,

  fetchMonitorGroups,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup
} from 'actions'
class LogContainer extends React.Component {
  render () {
    return (
      <Log {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    allDevices: state.devices.deviceAndGroups,
    monitorGroups: state.settings.monitorGroups
  }), {
    fetchDevicesGroups,

    fetchMonitorGroups,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup
  }
)(withRouter(LogContainer))
