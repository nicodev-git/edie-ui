import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeviceWizard from 'components/common/wizard/DeviceWizard'
import { fetchMonitorTemplates, clearDeviceWizardInitialValues, openDeviceMonitorWizard } from 'actions'

@connect(
  (state, props) => ({
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

export default class DeviceWizardContainer extends Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}

// export default connectWithStore(store, DeviceWizardContainer, mapStateToProps, mapDispatchToProps)
