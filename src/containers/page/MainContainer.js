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
  closeActivationModal
} from 'actions'

@connect((state) => {
  return {
    device: state.dashboard.selectedDevice,
    apiErrorModalOpen: state.dashboard.apiErrorModalOpen,
    apiError: state.dashboard.apiError,

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
  closeActivationModal
}, dispatch))
@withRouter
export default class MainContainer extends Component {

  componentDidMount () {
    this.incidentSocket = new IncidentSocket({
      onMessage: this.onIncidentSocketMessage.bind(this)
    })
    this.incidentSocket.connect()
  }

  componentWillUnmount () {
    this.incidentSocket.close()
  }

  onIncidentSocketMessage (msg) {
  }

  render () {
    return (
      <Main {...this.props} />
    )
  }
}
