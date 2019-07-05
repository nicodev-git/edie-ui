import React from 'react'
import EventLogs from 'components/dashboard/serverdetail/EventLogTable'

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceEventLog,

  updateSearchParams,
  replaceSearchWfs,
  updateSearchTags,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  selectLogName,

  updateMonitorQuery,

  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class EventLogsContainer extends React.Component {
  render () {
    return (
      <EventLogs {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    eventLogs: state.devices.eventLogs,
    selectedLogName: state.devices.selectedLogName,
    monitorLogNames: state.devices.monitorLogNames,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime,

    monitorQuery: state.devices.monitorQuery
  }),
  {
    fetchDeviceEventLog,

    updateSearchParams,
    replaceSearchWfs,
    updateSearchTags,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    selectLogName,

    updateMonitorQuery,

    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(EventLogsContainer))
