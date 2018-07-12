import React from 'react'
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import DeviceEditWizard from 'components/common/wizard/DeviceEditWizard'

import {
  openTplImageModal,
  closeTplImageModal,
  fetchImages,
  uploadImage,

  showDeviceTagModal,
  updateDeviceTags,

  updateDeviceCreds,
  showDeviceCredsPicker,
  selectDeviceCreds,

  fixNewDevice,
  installAgent,
  uninstallAgent,

  fetchCredentials,
  addCredentials,
  updateCredentials,
  removeCredentials,
  fetchCredTypes,

  fetchCollectors,
  showCollectorModal,
  addCollector,
  showCollectorInstallModal,

  fetchMonitorTemplates,
  openDeviceMonitorWizard,
  updateDeviceHost,
  addBasicMonitors,

  fetchDevice,
  updateInstallAgentStatus
} from 'actions'

import {getRemoveAfter} from 'shared/Global'

const selector = formValueSelector('deviceEditForm')

class DeviceEditWizardContainer extends React.Component {
  render () {
    return (
      <DeviceEditWizard {...this.props} />
    )
  }
}

DeviceEditWizard.defaultProps = {
  deviceType: '',

  extraParams: {},
  configParams: {},

  onSaved: null,
  onFinish: null,

  tabs: [{
    title: 'Basic',
    include: ['wanip', 'name', 'hostname', 'params.remove_after', 'tags'/*, 'image', 'lanip', 'agentid'*/],
    width: 6
  }, {
    title: 'Agent',
    include: ['agent'],
    width: 6,
  }/*, {
    title: 'Advanced',
    id: 'tab-devinfo-advanced',
    include: ['server_url', 'deviceid', 'devicetype', 'response', 'checkinterval', 'status', 'basicchecks', 'externalIP', 'tags', 'params.remove_after'],
    extra: [{
      name: 'id',
      title: 'DeviceId'
    }, {
      name: 'templateName',
      title: 'Template Name'
    }],
    width: 6
  }, {
    title: 'Credentials',
    include: ['credentials'],
    width: 12
  }*/]
}

export default connect(
  state => ({
    initialValues: {
      ...state.dashboard.selectedDevice,
      ...getRemoveAfter(state.dashboard.selectedDevice),
    },
    formValues: selector(state, 'wanip', 'name', 'agentType', 'collectorId', 'distribution', 'useIntegratedSecurity'),

    selectedDevice: state.dashboard.selectedDevice,

    tplImageModalVisible: state.settings.tplImageModalVisible,
    selectedTplImage: state.settings.selectedTplImage,

    images: state.dashboard.images,

    deviceTagModalOpen: state.devices.deviceTagModalOpen,
    deviceTags: state.devices.deviceTags,
    deviceCreds: state.devices.deviceCreds,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,
    selectedDeviceCreds: state.devices.selectedDeviceCreds,

    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,

    collectors: state.settings.collectors,
    collectorModalOpen: state.settings.collectorModalOpen,

    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    deviceMonitorsModalOpen: state.devices.deviceMonitorsModalOpen,

    installAgents: state.settings.installAgents,
    installAgentMessage: state.devices.installAgentMessage,

    fixStatus: state.devices.fixStatus,
    fixResult: state.devices.fixResult,

    collectorInstallModalOpen: state.devices.collectorInstallModalOpen,
    collectorTestStatus: state.devices.collectorTestStatus,

    deviceHost: state.devices.deviceHost
  }), {
    openTplImageModal,
    closeTplImageModal,
    fetchImages,
    uploadImage,

    showDeviceTagModal,
    updateDeviceTags,

    updateDeviceCreds,
    showDeviceCredsPicker,
    selectDeviceCreds,

    fixNewDevice,
    installAgent,
    uninstallAgent,

    fetchCredentials,
    addCredentials,
    updateCredentials,
    removeCredentials,
    fetchCredTypes,

    fetchCollectors,
    showCollectorModal,
    addCollector,
    showCollectorInstallModal,

    fetchMonitorTemplates,
    openDeviceMonitorWizard,
    updateDeviceHost,
    addBasicMonitors,

    fetchDevice,
    updateInstallAgentStatus
  }
)(DeviceEditWizardContainer)
