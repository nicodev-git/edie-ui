import React, { Component } from 'react'
import MonitorTable from '../../../../../components/page/content/device/monitors/MonitorTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  openDeviceMonitorPicker,
  openDeviceMonitorWizard,
  closeDeviceMonitorWizard,
  updateMapDevice
} from '../../../../../actions'

@connect(
  state => ({
    monitorPickerVisible: state.devices.monitorPickerVisible,
    monitorWizardVisible: state.devices.monitorWizardVisible,
    device: state.dashboard.selectedDevice
  }),
  dispatch => ({
    ...bindActionCreators({
      openDeviceMonitorPicker,
      openDeviceMonitorWizard,
      closeDeviceMonitorWizard,
      updateMapDevice
    }, dispatch)
  }),
  null,
  { withRef: true }
)
export default class MonitorTableContainer extends Component {
  render () {
    return (
      <MonitorTable {...this.props} ref="table"/>
    )
  }
}
