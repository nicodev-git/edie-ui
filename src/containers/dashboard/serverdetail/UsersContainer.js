import React from 'react'
import Users from 'components/dashboard/serverdetail/UserTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  showLocalUserModal,

  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class UsersContainer extends React.Component {
  render () {
    return (
      <Users {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    monitorUsers: state.devices.monitorUsers,
    localUserModalOpen: state.devices.localUserModalOpen,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    showLocalUserModal,

    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(UsersContainer))
