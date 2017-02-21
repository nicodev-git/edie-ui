import Dashboard from '../../../../components/page/content/dashboard/Dashboard'
import { connect } from 'react-redux'
import {
  fetchBigIncidents,

  fetchIncidents,
  fixIncident,
  ackIncident,

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

  openDashboardNewIncidentModal,
  closeDashboardNewIncidentModal
} from 'actions'

export default connect(
  state => ({
    bigIncidents: state.dashboard.bigIncidents,
    incidents: state.dashboard.incidents,

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

    stats: state.dashboard.stats
  }), {

    fetchBigIncidents,

    fetchIncidents,
    fixIncident,
    ackIncident,

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

    openDashboardNewIncidentModal,
    closeDashboardNewIncidentModal
  }
)(Dashboard)
