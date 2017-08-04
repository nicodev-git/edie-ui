import React from 'react'
import MainDashboard from 'components/dashboard/main/MainDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchSysSearchOptions,
  fetchWorkflows,

  fetchGauges,
  fetchGaugeItems,
  addGaugeItem,
  updateGaugeItem,
  removeGaugeItem,

  fetchGaugeBoards,
  addGaugeBoard,
  updateGaugeBoard,
  removeGaugeBoard,

  fixIncident,
  ackIncident
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
    mapDevices: state.dashboard.mapDevices,

    gauges: state.gauge.gauges,
    gaugeItems: state.gauge.gaugeItems,
    gaugeBoards: state.gauge.gaugeBoards,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,

    incidentDraw: state.devices.incidentDraw
  }), {
    fetchSysSearchOptions,
    fetchWorkflows,

    fetchGauges,
    fetchGaugeItems,
    addGaugeItem,
    updateGaugeItem,
    removeGaugeItem,

    fetchGaugeBoards,
    addGaugeBoard,
    updateGaugeBoard,
    removeGaugeBoard,

    fixIncident,
    ackIncident
  }
)(withRouter(MainDashboardContainer))
