import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeviceWizard from 'components/shared/wizard/DeviceWizard'
import { fetchMonitorTemplates, clearDeviceWizardInitialValues, openDeviceMonitorWizard } from 'actions'
import { connectWithStore } from 'shared/ConnectWithStore'
import { store } from 'shared/GetStore'

const mapStateToProps = (state) => {
  return {
    monitorTemplates: state.settings.monitorTemplates,
    initialValues: state.devices.wizardInitialValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMonitorTemplates,
    clearDeviceWizardInitialValues,
    openDeviceMonitorWizard
  }, dispatch)
}

/* @connect(
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
) */

class DeviceWizardContainer extends Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}

export default connectWithStore(store, DeviceWizardContainer, mapStateToProps, mapDispatchToProps)
