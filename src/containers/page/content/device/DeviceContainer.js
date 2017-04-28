import React from 'react'
import Device from 'components/page/content/device/Device'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { openDevice, fetchDevices, fetchDevice } from '../../../../actions'

@connect(
  state => ({
    devices: state.devices.devices,
    selectedDevice: state.dashboard.selectedDevice }),
  dispatch => ({
    ...bindActionCreators({ openDevice, fetchDevices, fetchDevice }, dispatch)
  })
)
@withRouter
export default class DeviceContainer extends React.Component {
  render () {
    return (
      <Device {...this.props} />
    )
  }
}
