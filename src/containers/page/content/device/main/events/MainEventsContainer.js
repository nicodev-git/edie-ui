import React, { Component } from 'react'
import MainEvents from '../../../../../../components/page/content/device/main/events/MainEvents'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import {
  fetchDeviceEvents,
  openWorkflowModal
} from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    events: state.devices.events,
    workflowModalVisible: state.settings.workflowModalVisible
  }), {
    fetchDeviceEvents,
    openWorkflowModal
  }
)
@withRouter
export default class MainEventsContainer extends Component {
  render () {
    return (
      <MainEvents {...this.props} />
    )
  }
}
