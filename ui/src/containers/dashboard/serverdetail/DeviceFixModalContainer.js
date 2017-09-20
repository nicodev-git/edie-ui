import React from 'react'
import { connect } from 'react-redux'

import DeviceFixModal from 'components/dashboard/serverdetail/edit/DeviceFixModal'

import {
  showDeviceFixModal
} from 'actions'

class DeviceFixModalContainer extends React.Component {
  render () {
    return (
      <DeviceFixModal {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    deviceFixModalOpen: state.devices.deviceFixModalOpen,
    fixCode: state.devices.fixCode
  }), {
    showDeviceFixModal
  }
)(DeviceFixModalContainer)
