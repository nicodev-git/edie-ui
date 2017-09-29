import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import GaugeWizard from 'components/common/wizard/GaugeWizard'

import {
  fetchSysSearchOptions,
  fetchWorkflows,
  fetchMonitorGroups,

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
      checkDuration: '1',
      checkDurationUnit: 'day',
      fixed: 'false',
      timing: 'realtime',
      tableViewMode: 'json',
      checkInterval: 3,
      ...state.devices.wizardInitialValues
    },
    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions,
    workflows: state.settings.workflows,
    monitorGroups: state.settings.monitorGroups,

    gaugeBoards: state.gauge.gaugeBoards,
    allDevices: state.devices.deviceAndGroups,

    formValues: formValueSelector('gaugeDeviceForm')(
      state, 'resource', 'monitorId', 'deviceId', 'timing')
  }), {
    fetchSysSearchOptions,
    fetchWorkflows,
    fetchMonitorGroups,

    clearDeviceWizardInitialValues
  }
)(GaugeWizardContainer)
