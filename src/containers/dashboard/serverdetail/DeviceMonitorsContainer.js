import React from 'react'
import DeviceMonitors from 'components/dashboard/serverdetail/DeviceMonitors'
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

class DeviceMonitorsContainer extends React.Component {
  render () {
    return (
      <DeviceMonitors {...this.props}/>
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
)(withRouter(DeviceMonitorsContainer))
