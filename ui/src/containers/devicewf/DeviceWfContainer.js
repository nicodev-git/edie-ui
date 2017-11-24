import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import DeviceWf from 'components/devicewf/DeviceWf'

import {
  fetchDevicesGroups,

  fetchMonitorGroups,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup
} from 'actions'
class DeviceWfContainer extends React.Component {
  render () {
    return (
      <DeviceWf {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    allDevices: state.devices.deviceAndGroups,
    monitorGroups: state.settings.monitorGroups
  }), {
    fetchDevicesGroups,

    fetchMonitorGroups,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup
  }
)(withRouter(DeviceWfContainer))
