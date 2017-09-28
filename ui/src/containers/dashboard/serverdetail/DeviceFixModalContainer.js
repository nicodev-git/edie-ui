import React from 'react'
import { connect } from 'react-redux'
import {formValueSelector} from 'redux-form'

import DeviceFixModal from 'components/dashboard/serverdetail/edit/DeviceFixModal'

import {
  fetchCollectors,
  fetchCredentials,
  fetchCredTypes,
  removeCredentials,
  addCredentials,
  updateCredentials,

  fixDevice,
  updateMapDevice,

  showDeviceFixModal,
  selectDeviceCreds,
  showDeviceCredsPicker,

  installAgent,
  showCollectorInstallModal
} from 'actions'

class DeviceFixModalContainer extends React.Component {
  render () {
    return (
      <DeviceFixModal {...this.props}/>
    )
  }
}

const selector = formValueSelector('editDeviceFixForm')

export default connect(
  state => ({
    initialValues: {
      agentType: 'collector'
    },
    formValues: selector(state, 'agnetType', 'collectorId'),
    deviceFixModalOpen: state.devices.deviceFixModalOpen,
    fixCode: state.devices.fixCode,

    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,
    collectors: state.settings.collectors,

    installAgentMessage: state.devices.installAgentMessage,
    installAgents: state.settings.installAgents,

    editDevice: state.devices.editDevice,

    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,

    fixStatus: state.devices.fixStatus,
    fixResult: state.devices.fixResult
  }), {
    fetchCollectors,
    fetchCredentials,
    fetchCredTypes,
    removeCredentials,
    addCredentials,
    updateCredentials,

    fixDevice,
    updateMapDevice,

    showDeviceFixModal,
    selectDeviceCreds,
    showDeviceCredsPicker,

    installAgent,
    showCollectorInstallModal
  }
)(DeviceFixModalContainer)
