import React, { Component } from 'react'
import Main from '../../components/page/Main'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
  updateNewIncidentMsg
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
  updateNewIncidentMsg
}, dispatch))
@withRouter
export default class MainContainer extends Component {

  componentDidMount () {
    this.incidentSocket = new IncidentSocket({
      listeners: {
        'incidents': this.onReceiveIncidents.bind(this),
        'statuses': this.onReceiveStatus.bind(this),
        'dashboard': this.onReceiveDashboard.bind(this)
      }
    })
    this.incidentSocket.connect()
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
  }

  onReceiveDashboard (msg) {
    console.log(msg)
    this.props.updateDashboardStats({
      open: msg.openincidents || 0,
      today: msg.todayincidents || 0,
      month: msg.monthincidents || 0
    })

    const incident = msg.latestincident || {}
    this.props.updateNewIncidentMsg(incident.description)
  }

  render () {
    return (
      <Main {...this.props} />
    )
  }
}
