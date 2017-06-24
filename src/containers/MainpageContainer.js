import React, { Component } from 'react'
import moment from 'moment'
import { debounce } from 'lodash'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Main from 'components/Main'
import IncidentSocket from 'util/socket/IncidentSocket'

import {
  closeDevice,
  closeApiErrorModal,

  fetchEnvVars,
  activateUser,
  openActivationModal,
  closeActivationModal,

  updateDashboardStats,
  fetchIncidents,
  addDashboardIncident,
  updateNewIncidentMsg,
  updateMapDeviceStatus,
  updateDashboardMapDevice,

  fetchUserInfo,

  updateSearchParams,
  updateQueryChips,

  updateBigIncidentParams,
  fetchBigIncidents,

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
  showMapExportModal,

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

class MainpageContainer extends Component {
  componentWillMount () {
    this.props.fetchUserInfo()
  }

  componentDidMount () {
    this.incidentSocket = new IncidentSocket({
      listeners: {
        'incidents': this.onReceiveIncidents.bind(this),
        'statuses': debounce(this.onReceiveStatus.bind(this), 500),
        'dashboard': this.onReceiveDashboard.bind(this),
        'refreshpage': this.onReceiveRefresh.bind(this),
        'updatedDevice': this.onDeviceUpdated.bind(this)
      }
    })
    this.incidentSocket.connect()
    this.clearNewincidentMsg = debounce(() => this.props.updateNewIncidentMsg(null), 8000)
  }

  componentWillUpdate (nextProps) {
    const {userInfo} = nextProps
    const oldInfo = this.props.userInfo
    if (oldInfo && oldInfo.keepIncidentAlert && userInfo && !userInfo.keepIncidentAlert) {
      this.props.updateNewIncidentMsg(null)
    }
  }

  componentWillUnmount () {
    this.incidentSocket.close()
  }

  onReceiveIncidents (msg) {
    // console.log(msg)
    if (msg && msg.length && (msg[0].severity === 'HIGH' || msg[0].severity === 'MEDIUM')) {
      this.props.addDashboardIncident(msg)
    }
  }

  onReceiveStatus (msg) {
    if (window && window.debugSocket) console.log(msg)
    this.props.updateMapDeviceStatus(msg)
  }

  onReceiveDashboard (msg) {
    // console.log(msg)
    this.props.updateDashboardStats({
      open: msg.openincidents || 0,
      today: msg.todayincidents || 0,
      month: msg.monthincidents || 0,
      attackers: msg.attackers || 0
    })

    const incident = msg.latestincident || {}
    const device = incident.devicename
    const time = moment(incident.startTimestamp || new Date()).format('HH:mm:ss')
    this.props.updateNewIncidentMsg({
      message: `${time} - ${device} - ${incident.description || ''}`,
      incident
    })

    const {userInfo} = this.props
    const keep = userInfo && userInfo.keepIncidentAlert
    if (!keep) this.clearNewincidentMsg()
  }

  onDeviceUpdated (msg) {
    // console.log(msg)
    this.props.updateDashboardMapDevice(msg)
  }

  onReceiveRefresh () {
    document.location.reload(true)
  }

  render () {
    return (
      <Main {...this.props} />
    )
  }
}

export default connect((state) => {
  return {
    device: state.dashboard.selectedDevice,
    apiErrorModalOpen: state.dashboard.apiErrorModalOpen,
    apiError: state.dashboard.apiError,

    newIncidentMsg: state.dashboard.newIncidentMsg,

    activationModalOpen: state.auth.activationModalOpen,
    activationMsg: state.auth.activationMsg,
    envVarAvailable: state.settings.envVarAvailable,
    envVars: state.settings.envVars,

    searchParams: state.search.params,

    userInfo: state.dashboard.userInfo,

    // bigIncidents: state.dashboard.bigIncidents,
    // incidents: state.dashboard.incidents,
    bigIncidentParams: state.dashboard.bigIncidentParams,

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
    mapExportModalOpen: state.dashboard.mapExportModalOpen,

    countries: [],

    incidentEventsModalOpen: state.dashboard.incidentEventsModalOpen,
    selectedIncident: state.dashboard.selectedIncident,

    stats: state.dashboard.stats,

    sidebarProfileMenuOpen: state.dashboard.sidebarProfileMenuOpen,
    sidebarMessageMenuOpen: state.dashboard.sidebarMessageMenuOpen,

    mainIncidentDraw: state.dashboard.mainIncidentDraw,

    attackers: state.attackers.attackers,

    commentsModalVisible: state.dashboard.commentsModalVisible,
    commentsIncident: state.dashboard.commentsIncident,

    attackerModalOpen: state.dashboard.attackerModalOpen
  }
},
dispatch => bindActionCreators({
  closeDevice,
  closeApiErrorModal,

  fetchEnvVars,
  activateUser,
  openActivationModal,
  closeActivationModal,

  updateDashboardStats,
  fetchIncidents,
  addDashboardIncident,
  updateNewIncidentMsg,
  updateMapDeviceStatus,
  updateDashboardMapDevice,

  fetchUserInfo,

  updateSearchParams,
  updateQueryChips,

  updateBigIncidentParams,
  fetchBigIncidents,

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
  showMapExportModal,

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
}, dispatch))(withRouter(MainpageContainer))
