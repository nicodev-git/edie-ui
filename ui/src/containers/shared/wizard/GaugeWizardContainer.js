import React from 'react'
import { connect } from 'react-redux'

import GaugeWizard from 'components/common/wizard/GaugeWizard'

import {
  fetchSysSearchOptions,

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
      duration: 3,
      durationUnit: 'day',
      ...state.devices.wizardInitialValues
    },
    userInfo: state.dashboard.userInfo,
    sysSearchOptions: state.search.sysSearchOptions
  }), {
    fetchSysSearchOptions,

    clearDeviceWizardInitialValues
  }
)(GaugeWizardContainer)
