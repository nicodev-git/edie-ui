import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Log from 'components/log/Log'

import {
  fetchDevices,
  updateMapDevice,

  fetchMonitorGroups,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup,

  fetchLogFilters,
  addLogFilter,
  updateLogFilter,
  removeLogFilter
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
    allDevices: state.devices.devices,
    monitorGroups: state.settings.monitorGroups,
    logFilters: state.settings.logFilters
  }), {
    fetchDevices,
    updateMapDevice,

    fetchMonitorGroups,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup,

    fetchLogFilters,
    addLogFilter,
    updateLogFilter,
    removeLogFilter
  }
)(withRouter(LogContainer))
