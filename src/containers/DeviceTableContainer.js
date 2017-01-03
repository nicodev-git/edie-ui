import React, { Component } from 'react'
import DeviceTable from '../components/DeviceTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDevices } from '../actions'

@connect(
  state => ({ resources: state.resources.all }),
  dispatch => ({
    signUser: bindActionCreators(fetchDevices, dispatch)
  })
)
export default class DeviceTableContainer extends Component {
  render () {
    return (
      <DeviceTable {...this.props} />
    )
  }
}
