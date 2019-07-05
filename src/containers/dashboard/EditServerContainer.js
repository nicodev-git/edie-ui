import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import {findIndex} from 'lodash'

import EditServer from 'components/dashboard/main/EditServer'

import {
  fetchDevicesGroups,
  fetchDevice,
  openDevice,

  updateMapDevice,
  updateDeviceCreds
} from 'actions'

class EditServerContainer extends React.Component {
  componentWillMount () {
    this.props.fetchDevice(this.getDeviceId())
    this.props.fetchDevicesGroups()
    this.props.openDevice(this.getDevice())
  }

  componentWillUpdate (nextProps) {
    const device = this.findDevice(nextProps)
    if (device) {
      if (!nextProps.device || nextProps.device.id !== device.id) {
        nextProps.openDevice(device)
      }
    }
  }

  getDeviceId () {
    return this.props.match.params.id
  }

  findDevice (props) {
    const {devices} = props
    const index = findIndex(devices, {id: props.match.params.id})
    if (index < 0) return null
    return devices[index]
  }

  getDevice () {
    return this.findDevice(this.props)
  }

  render () {
    const device = this.getDevice()
    if (!device) return <div>Loading...</div>

    return (
      <EditServer {...this.props} device={this.getDevice()}/>
    )
  }
}

export default connect(
  state => ({
    installAgents: state.settings.installAgents,
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,

    userInfo: state.dashboard.userInfo
  }), {
    fetchDevicesGroups,
    fetchDevice,
    openDevice,

    updateMapDevice,
    updateDeviceCreds
  }
)(withRouter(EditServerContainer))

