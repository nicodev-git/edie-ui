import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import EditServer from 'components/dashboard/main/EditServer'

import {
  fetchDeviceTemplates,
  fetchMonitorTemplates,
  addDevice
} from 'actions'

class EditServerContainer extends React.Component {
  render () {
    return (
      <EditServer {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,

    addDeviceError: state.devices.addDeviceError,
    addingDevice: state.devices.addingDevice
  }), {
    fetchDeviceTemplates,
    fetchMonitorTemplates,
    addDevice
  }
)(withRouter(EditServerContainer))

