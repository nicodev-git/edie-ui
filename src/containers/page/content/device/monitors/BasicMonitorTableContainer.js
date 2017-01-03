import React, { Component } from 'react'
import BasicMonitorTable from '../../../../../components/page/content/device/monitors/BasicMonitorTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDeviceBasicMonitors } from '../../../../../actions'

@connect(
  state => ({ basicMonitors: state.devices.basicMonitors }),
  dispatch => ({
    fetchDeviceBasicMonitors: bindActionCreators(fetchDeviceBasicMonitors, dispatch)
  })
)
export default class BasicMonitorTableContainer extends Component {
  render () {
    return (
      <BasicMonitorTable {...this.props} />
    )
  }
}

BasicMonitorTable.defaultProps = {
  device: {}
}
