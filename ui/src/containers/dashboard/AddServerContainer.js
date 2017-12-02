import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import AddServer from 'components/dashboard/main/AddServer'

import {
  fetchDeviceTemplates,
  fetchMonitorTemplates,
  addDevice
} from 'actions'

class AddServerContainer extends React.Component {
  render () {
    return (
      <AddServer {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,

    addDeviceError: state.devices.addDeviceError,
    addingDevice: state.devices.addingDevice,

    userInfo: state.dashboard.userInfo
  }), {
    fetchDeviceTemplates,
    fetchMonitorTemplates,
    addDevice
  }
)(withRouter(AddServerContainer))