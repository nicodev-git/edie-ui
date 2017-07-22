import React from 'react'
import { connect } from 'react-redux'

import GaugeWizard from 'components/common/wizard/GaugeWizard'

import {
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
    initialValues: state.devices.wizardInitialValues
  }), {
    clearDeviceWizardInitialValues
  }
)(GaugeWizardContainer)
