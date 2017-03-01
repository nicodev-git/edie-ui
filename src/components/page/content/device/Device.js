import React from 'react'

export default class Device extends React.Component {
  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace('/device/main/incidents')
    }
  }

  render () {
    console.log('in device: ')
    console.log(this.props)
    console.log(this.props.devices.length)
    if (!this.props.selectedDevice) {
      if (!this.props.devices.length) {
        console.log('fetch devices')
        this.props.fetchDevice(this.props.params.deviceId)
      } else {
        console.log('no fetching')
        for (let device of this.props.devices) {
          if (device.id === this.props.params.deviceId) {
            console.log('open device')
            this.props.openDevice(device)
          }
        }
      }

      return null
    }

    if (!this.props.selectedDevice) return null
    return this.props.children
  }
}
