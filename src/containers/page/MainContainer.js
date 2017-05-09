import React, { Component } from 'react'
import moment from 'moment'
import { debounce } from 'lodash'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Main from 'components/page/Main'
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

  fetchUserInfo,

  updateSearchParams,
  updateQueryChips
} from 'actions'

@connect((state) => {
  return {
    device: state.dashboard.selectedDevice,
    apiErrorModalOpen: state.dashboard.apiErrorModalOpen,
    apiError: state.dashboard.apiError,

    newIncidentMsg: state.dashboard.newIncidentMsg,

    activationModalOpen: state.auth.activationModalOpen,
    activationMsg: state.auth.activationMsg,
    envVarAvailable: state.settings.envVarAvailable,
    envVars: state.settings.envVars,

    searchParams: state.search.params
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

  fetchUserInfo,

  updateSearchParams,
  updateQueryChips
}, dispatch))
@withRouter
export default class MainContainer extends Component {
  componentWillMount () {
    this.props.fetchUserInfo()
  }

  componentDidMount () {
    this.incidentSocket = new IncidentSocket({
      listeners: {
        'incidents': this.onReceiveIncidents.bind(this),
        'statuses': debounce(this.onReceiveStatus.bind(this), 500),
        'dashboard': this.onReceiveDashboard.bind(this)
      }
    })
    this.incidentSocket.connect()
    this.clearNewincidentMsg = debounce(() => this.props.updateNewIncidentMsg(null), 8000)
  }

  componentWillUnmount () {
    this.incidentSocket.close()
  }

  onReceiveIncidents (msg) {
    console.log(msg)
    if (msg && msg.length && (msg[0].severity === 'HIGH' || msg[0].severity === 'MEDIUM')) {
      this.props.addDashboardIncident(msg)
    }
  }

  onReceiveStatus (msg) {
    // console.log(msg)
    this.props.updateMapDeviceStatus(msg)
  }

  onReceiveDashboard (msg) {
    console.log(msg)
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
    this.clearNewincidentMsg()
  }

  render () {
    return (
      <Main {...this.props} />
    )
  }
}
