import React from 'react'

export default class Device extends React.Component {
  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace('/device/main/incidents')
    }
  }

  render () {
    if (!this.props.selectedDevice) {
      if (!this.props.devices.length) {
        this.props.fetchDevices()
      } else {
        let deviceExists = false
        for (let device of this.props.devices) {
          if (device.id === this.props.params.deviceId) {
            deviceExists = true
            this.props.openDevice(device)
          }
        }

        if (!deviceExists) {
          this.props.router.replace('/')
        }
      }

      return null
    }

    console.log(this.props.devices)

    if (!this.props.selectedDevice) return null
    return this.props.children
  }
}
