import React from 'react'
import MainDashboard from 'components/dashboard/main/MainDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchDevicesGroups,
  fetchSysSearchOptions,
  fetchWorkflows,

  fetchGauges,
  addGaugeItem,
  updateGaugeItem,
  removeGaugeItem,

  fetchGaugeBoards,
  addGaugeBoard,
  updateGaugeBoard,
  removeGaugeBoard,
  selectGaugeBoard,
  setDefaultGaugeBoard,

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
    devices: state.devices.deviceAndGroups,

    gauges: state.gauge.gauges,
    gaugeItems: state.gauge.gaugeItems,
    gaugeBoards: state.gauge.gaugeBoards,
    selectedGaugeBoard: state.gauge.selectedGaugeBoard,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,

    incidentDraw: state.devices.incidentDraw
  }), {
    fetchDevicesGroups,
    fetchSysSearchOptions,
    fetchWorkflows,

    fetchGauges,
    addGaugeItem,
    updateGaugeItem,
    removeGaugeItem,

    fetchGaugeBoards,
    addGaugeBoard,
    updateGaugeBoard,
    removeGaugeBoard,
    selectGaugeBoard,
    setDefaultGaugeBoard,

    fixIncident,
    ackIncident
  }
)(withRouter(MainDashboardContainer))
