import React from 'react'
import DeviceFixModal from 'comopnents/dashboard/serverdetail/edit/DeviceFixModal'

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
