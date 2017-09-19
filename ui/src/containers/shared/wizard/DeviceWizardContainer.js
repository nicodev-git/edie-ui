import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  fetchCollectors
} from 'actions'

class DeviceWizardContainer extends Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}

export default connect(
  (state, props) => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    collectors: state.settings.collectors,
    initialValues: state.devices.wizardInitialValues,
    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,

    monitorGroups: state.settings.monitorGroups
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
      fetchCollectors
    }, dispatch)
  })
)(DeviceWizardContainer)
