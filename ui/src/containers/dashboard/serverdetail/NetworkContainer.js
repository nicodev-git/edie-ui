import React from 'react'
import Network from 'components/dashboard/serverdetail/NetworkTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceApps,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class NetworkContainer extends React.Component {
  render () {
    return (
      <Network {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    monitorNetworks: state.devices.monitorNetworks,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    fetchDeviceApps,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(NetworkContainer))
