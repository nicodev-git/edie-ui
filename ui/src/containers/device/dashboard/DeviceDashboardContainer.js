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
    serviceUsage: [{"label":"08:47 - 09:47","value":0},{"label":"09:47 - 10:47","value":0},{"label":"10:47 - 11:47","value":0}],
    topService: [{label: 'GetCount', value: 33}, {label: 'SelectList', value: 29}],
    servicePerformance: {"labels":[''],"values":[{"label":"08:47 - 09:47","value":[10]},{"label":"09:47 - 10:47","value":[22]},{"label":"10:47 - 11:47","value":[9]}]}
  }), {
  }
)(withRouter(DeviceDashboardContainer))
