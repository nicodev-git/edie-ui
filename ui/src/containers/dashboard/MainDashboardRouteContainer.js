import React from 'react'

import MainDashboardRoute from 'components/dashboard/main/MainDashboardRoute'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchDevicesGroups,
  fetchMonitorGroups,
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

  showGaugeModal,
  showGaugePicker,

  updateViewLogParams
} from 'actions'


class MainDashboardRouteContainer extends React.Component {
  render () {
    return (
      <MainDashboardRoute {...this.props}/>
    )
  }
}


export default connect(
  state => ({
    devices: state.devices.deviceAndGroups,
    monitorGroups: state.settings.monitorGroups,

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
    editGauge: state.gauge.editGauge,
    gaugePickerOpen: state.gauge.gaugePickerOpen,

    logViewParam: state.dashboard.logViewParam
  }), {
    fetchDevicesGroups,
    fetchMonitorGroups,
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

    showGaugeModal,
    showGaugePicker,

    updateViewLogParams
  }
)(withRouter(MainDashboardRouteContainer))
