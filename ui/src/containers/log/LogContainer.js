import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Log from 'components/log/Log'

import {
  fetchDevices,
  fetchCollectors,
  updateMapDevice,

  fetchMonitorGroups,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup,

  fetchLogFilters,
  addLogFilter,
  updateLogFilter,
  removeLogFilter,
  showLogFiltersModal
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
    logFilters: state.settings.logFilters,
    logFiltersModalOpen: state.settings.logFiltersModalOpen,

    collectors: state.settings.collectors,

    userInfo: state.dashboard.userInfo
  }), {
    fetchDevices,
    fetchCollectors,
    updateMapDevice,

    fetchMonitorGroups,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup,

    fetchLogFilters,
    addLogFilter,
    updateLogFilter,
    removeLogFilter,
    showLogFiltersModal
  }
)(withRouter(LogContainer))
