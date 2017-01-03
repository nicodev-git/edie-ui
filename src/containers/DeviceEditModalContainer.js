import React from 'react'
import DeviceEditModal from '../components/DeviceEditModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeDeviceEditModal, updateDevice, addDevice } from '../actions'

@connect(
  state => ({
    device: state.devices.editDevice,
    initialValues: state.devices.editDevice || {},
    updateDeviceError: state.devices.updateDeviceError
  }),
  dispatch => ({
    ...bindActionCreators({
      closeDeviceEditModal,
      updateDevice,
      addDevice
    }, dispatch)
  }))
export default class DeviceEditModalContainer extends React.Component {
  render () {
    return (
      <DeviceEditModal {...this.props} />
    )
  }
}
