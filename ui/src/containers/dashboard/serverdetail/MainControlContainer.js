import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import MainControl from 'components/dashboard/serverdetail/MainControl'
import {
  showDeviceEditModal,
  updateMapDevice
} from 'actions'

class MainControlContainer extends React.Component {
  render () {
    return (
      <MainControl {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice
  }), {
    showDeviceEditModal,
    updateMapDevice
  }
)(withRouter(MainControlContainer))
