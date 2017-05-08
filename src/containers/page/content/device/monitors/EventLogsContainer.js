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
  clearMonitors
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,

    eventLogs: state.devices.eventLogs,

    params: state.search.params
  }),
  {
    fetchDeviceEventLog,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors
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
