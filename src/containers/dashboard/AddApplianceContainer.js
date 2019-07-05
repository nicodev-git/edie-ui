import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import AddAppliance from 'components/dashboard/main/AddAppliance'

import {
  fetchDeviceTemplates,
  fetchMonitorTemplates,
  addDevice
} from 'actions'

class AddApplianceContainer extends React.Component {
  render () {
    return (
      <AddAppliance {...this.props}/>
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
)(withRouter(AddApplianceContainer))
