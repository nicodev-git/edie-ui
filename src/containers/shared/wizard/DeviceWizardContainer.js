import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DeviceWizard from 'components/shared/wizard/DeviceWizard'
import { fetchMonitorTemplates, clearDeviceWizardInitialValues, openDeviceMonitorWizard } from 'actions'

@connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    initialValues: state.devices.wizardInitialValues
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      clearDeviceWizardInitialValues,
      openDeviceMonitorWizard
    }, dispatch)
  })
)

export default class DeviceWizardContainer extends React.Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}
