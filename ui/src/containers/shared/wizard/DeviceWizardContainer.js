import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import DeviceWizard from 'components/common/wizard/DeviceWizard'
import {
  fetchMonitorTemplates,
  clearDeviceWizardInitialValues,
  openDeviceMonitorWizard,
  fetchCredTypes,
  fetchCredentials,
  showDeviceCredsPicker,
  showCredListModal,

  fetchDevice,

  fetchMonitorGroups,
  fetchCollectors,

  installAgent,
  updateInstallAgentStatus,

  clearFixStatus,
  clearEditDevice,
  fixNewDevice,
  showCollectorInstallModal,
  testCollector,
} from 'actions'

class DeviceWizardContainer extends Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}

const selector = formValueSelector('deviceForm')

export default connect(
  (state, props) => ({
    formValues: selector(state, 'wanip', 'name', 'agentType', 'collectorId', 'distribution', 'agentCollectorId', 'useIntegratedSecurity'),
    initialValues: {
      distribution: 'Ubuntu',
      agentType: 'collector',
      ...state.devices.wizardInitialValues,
      params: {
        remove_after: 3,
        remove_after_unit: 'months'
      }
    },
    editDevice: state.devices.editDevice,
    addingDevice: state.devices.addingDevice,

    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    collectors: state.settings.collectors,
    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,
    credModalDefaultType: state.devices.credModalDefaultType,
    credListModalOpen: state.settings.credListModalOpen,

    monitorGroups: state.settings.monitorGroups,

    collectorModalOpen: state.settings.collectorModalOpen,

    installAgents: state.settings.installAgents,
    installAgentMessage: state.devices.installAgentMessage,

    fixStatus: state.devices.fixStatus,
    fixResult: state.devices.fixResult,

    collectorInstallModalOpen: state.devices.collectorInstallModalOpen,
    collectorTestStatus: state.devices.collectorTestStatus
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      clearDeviceWizardInitialValues,
      openDeviceMonitorWizard,
      fetchCredTypes,
      fetchCredentials,
      showDeviceCredsPicker,
      showCredListModal,

      fetchDevice,

      fetchMonitorGroups,
      fetchCollectors,

      installAgent,
      updateInstallAgentStatus,

      clearFixStatus,
      clearEditDevice,
      fixNewDevice,
      showCollectorInstallModal,
      testCollector
    }, dispatch)
  })
)(DeviceWizardContainer)
