import React from 'react'
import Process from 'components/device/monitors/ProcessTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceProcesses,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,

    processes: state.devices.processes,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    fetchDeviceProcesses,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors
  }
)
@withRouter
export default class ProcessContainer extends React.Component {
  render () {
    return (
      <Process {...this.props}/>
    )
  }
}
