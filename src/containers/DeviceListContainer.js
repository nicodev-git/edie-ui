import React, { Component } from 'react'
import DeviceList from '../components/DeviceList'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDevices, openDeviceEditModal, deleteDevice } from '../actions'

@connect(
  state => ({
    devices: state.devices.devices,
    openModal: state.devices.openModal
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchDevices,
      openDeviceEditModal,
      deleteDevice
    }, dispatch)
  })
)
export default class DeviceListContainer extends Component {
  render () {
    return (
      <DeviceList {...this.props} />
    )
  }
}
