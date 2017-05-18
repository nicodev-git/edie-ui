import React from 'react'
import EventLogs from 'components/page/content/device/monitors/EventLogTable'

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceEventLog,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  selectLogName
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,

    eventLogs: state.devices.eventLogs,
    selectedLogName: state.devices.selectedLogName,
    monitorLogNames: state.devices.monitorLogNames,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    fetchDeviceEventLog,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    selectLogName
  }
)
@withRouter
export default class EventLogsContainer extends React.Component {
  render () {
    return (
      <EventLogs {...this.props}/>
    )
  }
}
