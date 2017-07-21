import React from 'react'
import DeviceDashboard from 'components/dashboard/map/device/dashboard/DeviceDashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

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
    serviceUsage: [],
    topService: [],
    servicePerformance: {
      labels: [],
      values: []
    }
  }), {
  }
)(withRouter(DeviceDashboardContainer))
