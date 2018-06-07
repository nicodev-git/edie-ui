import React from 'react'
import Service from 'components/dashboard/serverdetail/ServiceTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceProcesses,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class ServiceContainer extends React.Component {
  render () {
    return (
      <Service {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    services: state.devices.services,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    fetchDeviceProcesses,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(ServiceContainer))
