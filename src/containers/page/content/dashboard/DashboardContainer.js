import Dashboard from '../../../../components/page/content/dashboard/Dashboard'
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

  fetchDashboardStats
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

    attackers: state.dashboard.attackers,
    countries: [],

    incidentEventsModalOpen: state.dashboard.incidentEventsModalOpen,
    selectedIncident: state.dashboard.selectedIncident,

    stats: state.dashboard.stats,

    sidebarProfileMenuOpen: state.dashboard.sidebarProfileMenuOpen,
    sidebarMessageMenuOpen: state.dashboard.sidebarMessageMenuOpen,

    mainIncidentDraw: state.dashboard.mainIncidentDraw
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

    fetchDashboardStats
  }
)(Dashboard)
