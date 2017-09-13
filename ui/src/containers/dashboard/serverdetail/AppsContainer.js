import React from 'react'
import Apps from 'components/dashboard/serverdetail/ApplicationTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceApps,

  updateSearchParams,
  replaceSearchWfs,
  updateSearchTags,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  updateMonitorQuery,
  updateDeviceAppTab,

  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class AppsContainer extends React.Component {
  render () {
    return (
      <Apps {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    apps: state.devices.apps,
    monitorHotfixes: state.devices.monitorHotfixes,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime,

    monitorQuery: state.devices.monitorQuery,
    deviceAppTab: state.devices.deviceAppTab
  }),
  {
    fetchDeviceApps,

    updateSearchParams,
    replaceSearchWfs,
    updateSearchTags,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    updateMonitorQuery,
    updateDeviceAppTab,

    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(AppsContainer))
