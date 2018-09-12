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

  addGaugeRect,
  updateGaugeRect,
  removeGaugeRect,

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
  showMonitorDetailModal,

  showWfRectModal,
  showRectSearchModal,
  showEntityDetailModal,

  fetchWfRectGroups,
  addWfRectGroup,
  updateWfRectGroup,
  removeWfRectGroup,

  showWfRectGroupsModal,
  selectWfRectGroup,

  showAppsPrefModal,
  updateAppsPref,
  fetchAllApps,
  showAppDevicesModal,

  showServerSearchModal,
  searchServers,
  updateServerSearchResults,
  updateServerSearchParams,
  showServerCmdModal,
  showRangeAddModal,
  scanRange,

  fetchMapItemsByMap,
  addMapItem,
  updateMapItem,
  removeMapItem

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

    deleteDeviceState: state.dashboard.deleteDeviceState,

    wfRectModalOpen: state.dashboard.wfRectModalOpen,
    editWfRect: state.dashboard.editWfRect,

    rectSearchModalOpen: state.dashboard.rectSearchModalOpen,
    rectSearchParams: state.dashboard.rectSearchParams,
    entityDetailModalOpen: state.search.entityDetailModalOpen,
    detailEntity: state.search.detailEntity,

    wfRectGroups: state.dashboard.wfRectGroups,
    wfRectGroupsModalOpen: state.dashboard.wfRectGroupsModalOpen,
    selectedWfRectGroup: state.dashboard.selectedWfRectGroup,

    appsPrefModalOpen: state.dashboard.appsPrefModalOpen,
    appsPref: state.dashboard.appsPref,
    allApps: state.dashboard.allApps,
    appDevicesModalOpen: state.dashboard.appDevicesModalOpen,
    appDeviceIds: state.dashboard.appDeviceIds,
    selectedApp: state.dashboard.selectedApp,

    serverSearchModalOpen: state.dashboard.serverSearchModalOpen,
    serverSearchResults: state.dashboard.serverSearchResults,
    serverSearchParams: state.dashboard.serverSearchParams,

    serverCmdModalOpen: state.dashboard.serverCmdModalOpen,

    rangeAddModalOpen: state.dashboard.rangeAddModalOpen,
    rangeScanResults: state.dashboard.rangeScanResults
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

    addGaugeRect,
    updateGaugeRect,
    removeGaugeRect,

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
    showMonitorDetailModal,

    showWfRectModal,
    showRectSearchModal,
    showEntityDetailModal,

    fetchWfRectGroups,
    addWfRectGroup,
    updateWfRectGroup,
    removeWfRectGroup,

    showWfRectGroupsModal,
    selectWfRectGroup,

    showAppsPrefModal,
    updateAppsPref,
    fetchAllApps,
    showAppDevicesModal,

    showServerSearchModal,
    searchServers,
    updateServerSearchResults,
    updateServerSearchParams,
    showServerCmdModal,
    showRangeAddModal,
    scanRange,

    fetchMapItemsByMap,
    addMapItem,
    updateMapItem,
    removeMapItem
  }
)(withRouter(MainDashboardContainer))
