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
  showGaugeBoardsModal,

  fixIncident,
  ackIncident,

  loadSearch,

  showGaugeModal
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
    gaugeBoardsModalOpen: state.gauge.gaugeBoardsModalOpen,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,

    incidentDraw: state.devices.incidentDraw,

    gaugeModalOpen: state.gauge.gaugeModalOpen,
    editGauge: state.gauge.editGauge
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
    showGaugeBoardsModal,

    fixIncident,
    ackIncident,

    loadSearch,

    showGaugeModal
  }
)(withRouter(MainDashboardContainer))
