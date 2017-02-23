import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fixIncident,
  ackIncident,
  fetchDeviceIncidents,
  openAddDeviceIncident,
  closeAddDeviceIncident,
  addDeviceIncident,
  fixAllDeviceIncidents
} from 'actions'

import MainIncidents from 'components/page/content/device/main/incidents/MainIncidents'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    incidents: state.devices.incidents,
    addIncidentModalVisible: state.devices.addIncidentModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchDeviceIncidents,
      fixIncident,
      ackIncident,
      openAddDeviceIncident,
      closeAddDeviceIncident,
      addDeviceIncident,
      fixAllDeviceIncidents
    }, dispatch)
  })
)
@withRouter
export default class MainIncidentsContainer extends Component {
  render () {
    return (
      <MainIncidents {...this.props} />
    )
  }
}
