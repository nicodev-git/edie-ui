import React, { Component } from 'react'
import Monitors from '../../../../../components/page/content/device/monitors/Monitors'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  openDeviceMonitorPicker,
  openDeviceMonitorWizard,
  closeDeviceMonitorWizard,
  updateMapDevice
} from 'actions'

@connect(
  state => ({ device: state.dashboard.selectedDevice })
)
@withRouter
export default class MonitorsContainer extends Component {
  render () {
    return (
      <Monitors {...this.props} />
    )
  }
}
