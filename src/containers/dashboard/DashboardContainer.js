import Dashboard from 'components/dashboard/Dashboard'
import { connect } from 'react-redux'
import {
  fetchBigIncidents,

  fetchIncidents,
  fixIncident,
  ackIncident,

  fetchDeviceCategories,
  fetchDeviceTemplates,

  openDevice,
  addMapDevice,
  deleteMapDevice,
  updateMapDevice,
  addMapLine,
  deleteMapLine,
  updateMapLine,

  importMap,
  openMapImportModal,
  closeMapImportModal,

  addMap,
  updateMap,
  deleteMap,

  fetchMaps,
  changeMap,

  fetchAttackers,

  updateDashboard,
  requireFullScreen,

  openIncidentEventsModal,
  closeIncidentEventsModal,

  openDashboardNewIncidentModal,
  closeDashboardNewIncidentModal,

  showSidebarMessageMenu,

  fetchDashboardStats,
  updateDeviceIncident,
  showCommentsModal,

  showAttackerModal
} from 'actions'

export default connect(
  state => ({
    bigIncidents: state.dashboard.bigIncidents,
    incidents: state.dashboard.incidents,

    deviceCategories: state.settings.deviceCategories,
    deviceTemplates: state.settings.deviceTemplates,

    mapDevices: state.dashboard.mapDevices,
    mapLines: state.dashboard.mapLines,
    selectedMap: state.dashboard.selectedMap,
    showTraffic: state.settings.showTraffic,

    newIncidentModalOpen: state.dashboard.newIncidentModalOpen,

    isFullScreen: state.dashboard.isFullScreen,

    maps: state.dashboard.maps,
    mapImportModalVisible: state.dashboard.mapImportModalVisible,

    countries: [],

    incidentEventsModalOpen: state.dashboard.incidentEventsModalOpen,
    selectedIncident: state.dashboard.selectedIncident,

    stats: state.dashboard.stats,

    sidebarProfileMenuOpen: state.dashboard.sidebarProfileMenuOpen,
    sidebarMessageMenuOpen: state.dashboard.sidebarMessageMenuOpen,

    mainIncidentDraw: state.dashboard.mainIncidentDraw,

    attackers: state.attackers.attackers,

    envVars: state.settings.envVars,
    userInfo: state.dashboard.userInfo,

    commentsModalVisible: state.dashboard.commentsModalVisible,
    commentsIncident: state.dashboard.commentsIncident,

    attackerModalOpen: state.dashboard.attackerModalOpen
  }), {

    fetchBigIncidents,

    fetchIncidents,
    fixIncident,
    ackIncident,

    fetchDeviceCategories,
    fetchDeviceTemplates,

    openDevice,
    addMapDevice,
    deleteMapDevice,
    updateMapDevice,
    addMapLine,
    deleteMapLine,
    updateMapLine,

    importMap,
    openMapImportModal,
    closeMapImportModal,

    addMap,
    updateMap,
    deleteMap,

    fetchMaps,
    changeMap,

    fetchAttackers,

    updateDashboard,
    requireFullScreen,

    openIncidentEventsModal,
    closeIncidentEventsModal,

    openDashboardNewIncidentModal,
    closeDashboardNewIncidentModal,

    showSidebarMessageMenu,

    fetchDashboardStats,
    updateDeviceIncident,
    showCommentsModal,

    showAttackerModal
  }
)(Dashboard)
