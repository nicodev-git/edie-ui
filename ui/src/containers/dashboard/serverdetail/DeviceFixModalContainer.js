import React from 'react'
import { connect } from 'react-redux'

import DeviceFixModal from 'components/dashboard/serverdetail/edit/DeviceFixModal'

import {
  fetchCredentials,
  fetchCredTypes,
  removeCredentials,
  addCredentials,

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
    credentialTypes: state.settings.credentialTypes,
    collectors: state.settings.collectors,

    installAgentMessage: state.devices.installAgentMessage,
    installAgents: state.settings.installAgents,

    editDevice: state.devices.editDevice,

    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible
  }), {
    fetchCredentials,
    fetchCredTypes,
    removeCredentials,
    addCredentials,

    showDeviceFixModal,
    selectDeviceCreds,
    showDeviceCredsPicker
  }
)(DeviceFixModalContainer)
