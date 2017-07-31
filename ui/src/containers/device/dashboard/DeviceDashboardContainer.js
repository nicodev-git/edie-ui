import React from 'react'
import DeviceDashboard from 'components/dashboard/map/device/dashboard/DeviceDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import {
  fetchSysSearchOptions,
  addDeviceGauge,
  updateDeviceGauge,
  removeDeviceGauge,

  fetchGauges,

  fixIncident,
  ackIncident
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

    gauges: state.gauge.gauges,

    mapDevices: state.devices.mapDevices,
    mapLines: state.devices.mapLines,

    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,

    incidentDraw: state.devices.incidentDraw
  }), {
    fetchSysSearchOptions,
    addDeviceGauge,
    updateDeviceGauge,
    removeDeviceGauge,

    fetchGauges,

    fixIncident,
    ackIncident
  }
)(withRouter(DeviceDashboardContainer))
