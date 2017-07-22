import React from 'react'
import DeviceDashboard from 'components/dashboard/map/device/dashboard/DeviceDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchGroupDevicesAndLines,
  fetchSysSearchOptions
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

    incidents: [],
    serviceUsage: [{"label":"08:47 - 09:47","value":0},{"label":"09:47 - 10:47","value":0},{"label":"10:47 - 11:47","value":0}],
    topService: [{name: 'GetCount', value: 33}, {name: 'SelectList', value: 29}],
    servicePerformance: {"labels":[''],"values":[{"label":"08:47 - 09:47","value":[10]},{"label":"09:47 - 10:47","value":[22]},{"label":"10:47 - 11:47","value":[9]}]},

    mapDevices: state.devices.mapDevices,
    mapLines: state.devices.mapLines,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions
  }), {
    fetchGroupDevicesAndLines,
    fetchSysSearchOptions
  }
)(withRouter(DeviceDashboardContainer))
