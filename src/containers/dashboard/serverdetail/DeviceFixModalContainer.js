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
  updateInstallAgentStatus,
  showCollectorInstallModal,

  testCollector
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
    initialValues: {
      agentType: 'collector',
      ...state.devices.editDevice
    },
    formValues: formValueSelector('editDeviceFixForm')(state, 'agentType', 'collectorId', 'useIntegratedSecurity'),
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
    fixResult: state.devices.fixResult,

    collectorInstallModalOpen: state.devices.collectorInstallModalOpen,
    collectorTestStatus: state.devices.collectorTestStatus
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
    updateInstallAgentStatus,
    showCollectorInstallModal,

    testCollector
  }
)(DeviceFixModalContainer)
