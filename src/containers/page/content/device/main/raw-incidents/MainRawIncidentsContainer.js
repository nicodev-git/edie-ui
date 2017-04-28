import React, { Component } from 'react'
import MainRawIncidents from 'components/page/content/device/main/raw-incidents/MainRawIncidents'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {fetchDeviceRawIncidents} from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    rawIncidents: state.devices.rawIncidents
  }),
  dispatch => ({
    fetchDeviceRawIncidents: bindActionCreators(fetchDeviceRawIncidents, dispatch)
  })
)
@withRouter
export default class MainRawIncidentsContainer extends Component {
  render () {
    return (
      <MainRawIncidents {...this.props} />
    )
  }
}
