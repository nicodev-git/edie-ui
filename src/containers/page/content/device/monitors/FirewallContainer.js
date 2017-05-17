import React from 'react'
import Firewall from 'components/page/content/device/monitors/FirewallTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceApps,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,

    monitorFwRules: state.devices.monitorFwRules,
    monitorFwStatus: state.devices.monitorFwStatus,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    fetchDeviceApps,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors
  }
)
@withRouter
export default class FirewallContainer extends React.Component {
  render () {
    return (
      <Firewall {...this.props}/>
    )
  }
}
