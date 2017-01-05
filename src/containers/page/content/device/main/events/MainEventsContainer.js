import React, { Component } from 'react'
import MainEvents from '../../../../../../components/page/content/device/main/events/MainEvents'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDeviceEvents } from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    events: state.devices.events
  }),
  dispatch => ({
    fetchDeviceEvents: bindActionCreators(fetchDeviceEvents, dispatch)
  })
)
@withRouter
export default class MainEventsContainer extends Component {
  render () {
    return (
      <MainEvents {...this.props} />
    )
  }
}
