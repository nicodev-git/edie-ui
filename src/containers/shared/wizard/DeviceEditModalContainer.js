import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import DeviceEditModal from 'components/common/wizard/DeviceEditModal'

import {
  fetchMonitorTemplates,
  openDeviceMonitorWizard,
  fetchCredTypes,
  fetchCredentials,
  showDeviceCredsPicker,
  addCredentials,
  removeCredentials,
  fetchDevice,

  fetchMonitorGroups,
  fetchCollectors,

  installAgent,
  updateInstallAgentStatus,

  updateMapDevice,
  addBasicMonitors,

  openTplImageModal,
  closeTplImageModal,
  fetchImages,
  uploadImage,

  showDeviceTagModal,
  updateDeviceTags
} from 'actions'

class DeviceEditModalContainer extends React.Component {
  render () {
    return (
      <DeviceEditModal {...this.props} />
    )
  }
}

const selector = formValueSelector('editDeviceForm')

export default connect(
  state => ({
    initialValues: state.devices.editDevice,
    formValues: selector(state, 'wanip', 'name', 'agentType', 'collectorId', 'distribution'),

    images: state.dashboard.images,
    tplImageModalVisible: state.settings.tplImageModalVisible,
    selectedTplImage: state.settings.selectedTplImage,

    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    collectors: state.settings.collectors,
    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,
    deviceTagModalOpen: state.devices.deviceTagModalOpen,
    deviceTags: state.devices.deviceTags,

    monitorGroups: state.settings.monitorGroups,

    installAgentMessage: state.devices.installAgentMessage,
    installAgents: state.settings.installAgents,

    editDevice: state.devices.editDevice,

    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible
  }), {
    fetchMonitorTemplates,
    openDeviceMonitorWizard,
    fetchCredTypes,
    fetchCredentials,
    showDeviceCredsPicker,
    addCredentials,
    removeCredentials,
    fetchDevice,

    fetchMonitorGroups,
    fetchCollectors,

    installAgent,
    updateInstallAgentStatus,

    updateMapDevice,
    addBasicMonitors,

    openTplImageModal,
    closeTplImageModal,
    fetchImages,
    uploadImage,

    showDeviceTagModal,
    updateDeviceTags
  }
)(DeviceEditModalContainer)
