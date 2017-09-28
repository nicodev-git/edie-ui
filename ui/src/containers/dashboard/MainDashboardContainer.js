import React from 'react'
import MainDashboard from 'components/dashboard/main/MainDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchDevicesGroups,
  fetchMonitorGroups,
  fetchSysSearchOptions,
  fetchWorkflows,
  fetchMonitorTemplates,
  fetchDeviceTemplates,

  fetchCollectors,
  fetchCredentials,

  fetchGauges,
  addGaugeItem,
  updateGaugeItem,
  removeGaugeItem,

  fetchGaugeBoards,
  addGaugeBoard,
  updateGaugeBoard,
  removeGaugeBoard,
  selectGaugeBoard,
  setDefaultGaugeBoard,
  showGaugeBoardsModal,

  fixIncident,
  ackIncident,

  loadSearch,

  showGaugeModal,
  showGaugePicker,

  updateViewLogParams,
  updateViewLogDevice,

  openDevice,
  closeDevice,
  openDeviceMonitorWizard,
  closeDeviceMonitorWizard,
  openDeviceMonitorPicker,
  closeDeviceMonitorPicker,

  showDeviceTplPicker,
  addDevice,
  updateMapDevice,
  deleteMapDevice,
  showMonitorDetailModal
} from 'actions'

class MainDashboardContainer extends React.Component {
  render () {
    return (
      <MainDashboard {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.deviceAndGroups,
    monitorGroups: state.settings.monitorGroups,
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,

    gauges: state.gauge.gauges,
    gaugeItems: state.gauge.gaugeItems,
    gaugeBoards: state.gauge.gaugeBoards,
    gaugeBoardsModalOpen: state.gauge.gaugeBoardsModalOpen,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,

    incidentDraw: state.devices.incidentDraw,

    gaugeModalOpen: state.gauge.gaugeModalOpen,
    editGauge: state.gauge.editGauge,
    gaugePickerOpen: state.gauge.gaugePickerOpen,

    logViewParam: state.dashboard.logViewParam,

    selectedDevice: state.dashboard.selectedDevice,
    monitorPickerVisible: state.devices.monitorPickerVisible,
    monitorWizardVisible: state.devices.monitorWizardVisible,

    deviceTplPickerOpen: state.dashboard.deviceTplPickerOpen,
    monitorDetailModalOpen: state.dashboard.monitorDetailModalOpen,
    gaugeDevice: state.dashboard.gaugeDevice,
    gaugeMonitor: state.dashboard.gaugeMonitor,

    deleteDeviceState: state.dashboard.deleteDeviceState
  }), {
    fetchDevicesGroups,
    fetchMonitorGroups,
    fetchSysSearchOptions,
    fetchWorkflows,
    fetchMonitorTemplates,
    fetchDeviceTemplates,

    fetchCollectors,
    fetchCredentials,

    fetchGauges,
    addGaugeItem,
    updateGaugeItem,
    removeGaugeItem,

    fetchGaugeBoards,
    addGaugeBoard,
    updateGaugeBoard,
    removeGaugeBoard,
    selectGaugeBoard,
    setDefaultGaugeBoard,
    showGaugeBoardsModal,

    fixIncident,
    ackIncident,

    loadSearch,

    showGaugeModal,
    showGaugePicker,

    updateViewLogParams,
    updateViewLogDevice,

    openDevice,
    closeDevice,
    openDeviceMonitorWizard,
    closeDeviceMonitorWizard,
    openDeviceMonitorPicker,
    closeDeviceMonitorPicker,

    showDeviceTplPicker,
    addDevice,
    updateMapDevice,
    deleteMapDevice,
    showMonitorDetailModal
  }
)(withRouter(MainDashboardContainer))
