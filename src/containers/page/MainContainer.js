import React, { Component } from 'react'
import moment from 'moment'
import { debounce } from 'lodash'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Main from '../../components/page/Main'
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

  fetchUserInfo
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
    envVars: state.settings.envVars
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

  fetchUserInfo
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
    this.clearNewincidentMsg = debounce(() => this.props.updateNewIncidentMsg(''), 4000)
  }

  componentWillUnmount () {
    this.incidentSocket.close()
  }

  onReceiveIncidents (msg) {
    console.log(msg)
    if (msg && msg.length) {
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
      month: msg.monthincidents || 0
    })

    const incident = msg.latestincident || {}
    const time = moment(incident.startTimestamp || new Date()).format('HH:mm:ss')
    this.props.updateNewIncidentMsg(`${time} ${incident.description || ''}`)
    this.clearNewincidentMsg()
  }

  render () {
    return (
      <Main {...this.props} />
    )
  }
}
