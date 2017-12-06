import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Log from 'components/log/Log'

import {
  fetchDevices,
  fetchCollectors,
  fetchMonitorTemplates,
  updateMapDevice,

  fetchMonitorGroups,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup,

  fetchLogFilters,
  addLogFilter,
  updateLogFilter,
  removeLogFilter,
  showLogFiltersModal,

  openDevice,
  openDeviceMonitorWizard,
  closeDeviceMonitorWizard
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

    monitorTemplates: state.settings.monitorTemplates,
    collectors: state.settings.collectors,
    monitorPickerVisible: state.devices.monitorPickerVisible,
    monitorWizardVisible: state.devices.monitorWizardVisible,

    userInfo: state.dashboard.userInfo
  }), {
    fetchDevices,
    fetchCollectors,
    fetchMonitorTemplates,
    updateMapDevice,

    fetchMonitorGroups,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup,

    fetchLogFilters,
    addLogFilter,
    updateLogFilter,
    removeLogFilter,
    showLogFiltersModal,

    openDevice,
    openDeviceMonitorWizard,
    closeDeviceMonitorWizard
  }
)(withRouter(LogContainer))
