import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import GaugeWizard from 'components/common/wizard/GaugeWizard'

import {
  fetchSysSearchOptions,
  fetchWorkflows,

  clearDeviceWizardInitialValues
} from 'actions'

class GaugeWizardContainer extends React.Component {
  render () {
    return (
      <GaugeWizard {...this.props} />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {
      resource: 'search',
      duration: '3',
      durationUnit: 'day',
      splitBy: '1',
      splitUnit: 'day',
      fixed: 'false',
      timing: 'realtime',
      ...state.devices.wizardInitialValues
    },
    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,
    formValues: formValueSelector('gaugeDeviceForm')(
      state, 'resource', 'monitorId', 'deviceId', 'timing')
  }), {
    fetchSysSearchOptions,
    fetchWorkflows,

    clearDeviceWizardInitialValues
  }
)(GaugeWizardContainer)
