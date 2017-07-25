import React from 'react'
import DeviceDashboard from 'components/dashboard/map/device/dashboard/DeviceDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchGroupDevicesAndLines,
  fetchSysSearchOptions,
  addGroupDevice,
  updateGroupDevice,
  removeGroupDevice
} from 'actions'

class DeviceDashboardContainer extends React.Component {
  render () {
    return (
      <DeviceDashboard {...this.props} />
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,

    deviceTemplates: state.settings.deviceTemplates,

    mapDevices: state.devices.mapDevices,
    mapLines: state.devices.mapLines,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions
  }), {
    fetchGroupDevicesAndLines,
    fetchSysSearchOptions,
    addGroupDevice,
    updateGroupDevice,
    removeGroupDevice
  }
)(withRouter(DeviceDashboardContainer))
