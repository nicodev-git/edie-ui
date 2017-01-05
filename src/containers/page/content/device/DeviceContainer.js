import React from 'react'
import Device from '../../../../components/page/content/device/Device'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

@connect(
  state => ({ selectedDevice: state.dashboard.selectedDevice })
)
@withRouter
export default class DeviceContainer extends React.Component {
  render () {
    return (
      <Device {...this.props} />
    )
  }
}
