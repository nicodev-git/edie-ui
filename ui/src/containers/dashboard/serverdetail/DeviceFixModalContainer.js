import React from 'react'
import { connect } from 'react-redux'

import DeviceFixModal from 'components/dashboard/serverdetail/edit/DeviceFixModal'

import {
  fetchCredentials,
  fetchCredTypes,

  showDeviceFixModal,
  selectDeviceCreds,
  showDeviceCredsPicker
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
    fixCode: state.devices.fixCode,

    credentials: state.settings.credentials,
    collectors: state.settings.collectors,

    installAgentMessage: state.devices.installAgentMessage,
    installAgents: state.settings.installAgents,

    editDevice: state.devices.editDevice,

    deviceCredsModalOpen: state.devices.deviceCredsModalOpen
  }), {
    fetchCredentials,
    fetchCredTypes,

    showDeviceFixModal,
    selectDeviceCreds,
    showDeviceCredsPicker
  }
)(DeviceFixModalContainer)
