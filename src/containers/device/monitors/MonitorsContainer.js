import React, { Component } from 'react'
import Monitors from 'components/dashboard/map/device/monitors/Monitors'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  openDeviceMonitorPicker,
  openDeviceMonitorWizard,
  closeDeviceMonitorWizard,
  updateMapDevice,
  reloadDevice,

  fetchDeviceEventLog,
  fetchDeviceApps,
  fetchDeviceProcesses,
  fetchMonitorTemplates,
  closeDeviceMonitorPicker,
  openProcessModal,
  closeProcessModal,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,

  fetchMonitorOS,
  fetchMonitorDisk,
  fetchMonitorCpu,
  fetchMonitorMemory,
  updateMonitorRealTime,
  clearMonitors,

  showMonitorHistoryModal
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    monitorPickerVisible: state.devices.monitorPickerVisible,
    monitorWizardVisible: state.devices.monitorWizardVisible,
    process: state.devices.process,
    processModalOpen: state.devices.processModalOpen,

    monitorHistoryModalOpen: state.devices.monitorHistoryModalOpen,
    selectedMonitor: state.devices.selectedMonitor,

    eventLogs: state.devices.eventLogs,
    apps: state.devices.apps,
    processes: state.devices.processes,
    monitorTemplates: state.settings.monitorTemplates,

    params: state.search.params,

    monitorOS: state.devices.monitorOS,
    monitorDisk: state.devices.monitorDisk,
    monitorCpu: state.devices.monitorCpu,
    monitorMemory: state.devices.monitorMemory,

    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    openDeviceMonitorPicker,
    openDeviceMonitorWizard,
    closeDeviceMonitorWizard,
    updateMapDevice,
    reloadDevice,

    fetchDeviceEventLog,
    fetchDeviceApps,
    fetchDeviceProcesses,
    fetchMonitorTemplates,
    closeDeviceMonitorPicker,
    openProcessModal,
    closeProcessModal,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,

    fetchMonitorOS,
    fetchMonitorDisk,
    fetchMonitorCpu,
    fetchMonitorMemory,
    updateMonitorRealTime,
    clearMonitors,

    showMonitorHistoryModal
  }
)
@withRouter
export default class MonitorsContainer extends Component {
  render () {
    return (
      <Monitors {...this.props} />
    )
  }
}
