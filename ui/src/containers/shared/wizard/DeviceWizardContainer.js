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

  fetchMonitorGroups,
  fetchCollectors,

  installAgent,
  clearFixStatus,
  fixNewDevice
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
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    collectors: state.settings.collectors,
    formValues: selector(state, 'wanip', 'name', 'agentType', 'collectorId', 'distribution'),
    initialValues: {
      distribution: 'Ubuntu',
      agentType: 'collector',
      ...state.devices.wizardInitialValues
    },
    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,

    monitorGroups: state.settings.monitorGroups,

    collectorModalOpen: state.settings.collectorModalOpen,

    installAgents: state.settings.installAgents,
    installAgentMessage: state.devices.installAgentMessage,

    fixStatus: state.devices.fixStatus,
    fixResult: state.devices.fixResult
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      clearDeviceWizardInitialValues,
      openDeviceMonitorWizard,
      fetchCredTypes,
      fetchCredentials,
      showDeviceCredsPicker,

      fetchMonitorGroups,
      fetchCollectors,

      installAgent,
      clearFixStatus,
      fixNewDevice
    }, dispatch)
  })
)(DeviceWizardContainer)
