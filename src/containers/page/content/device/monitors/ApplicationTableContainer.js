import React, { Component } from 'react'
import ApplicationTable from '../../../../../components/page/content/device/monitors/ApplicationTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDeviceApps } from '../../../../../actions'

@connect(
  state => ({ apps: state.devices.apps }),
  dispatch => ({
    fetchDeviceApps: bindActionCreators(fetchDeviceApps, dispatch)
  })
)
export default class ApplicationTable extends Component {
  render () {
    return (
      <ApplicationTable {...this.props} />
    )
  }
}

ApplicationTable.defaultProps = {
  device: {}
}
