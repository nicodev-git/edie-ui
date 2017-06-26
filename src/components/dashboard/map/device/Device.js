import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import DeviceMain from 'components/dashboard/map/device/main/Main'
import DeviceConnectedContainer from 'containers/device/connected/ConnectedContainer'
import DeviceInfoContainer from 'containers/device/info/InfoContainer'
import DeviceTopology from 'containers/device/topology/TopologyContainer'
import GroupDevicesContainer from 'containers/device/devices/DevicesContainer'

export default class Device extends React.Component {
  // componentWillMount () {
  //   if (!this.props.children) {
  //     this.props.router.replace('/device/main/incidents')
  //   }
  // }

  render () {
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
    return (
      <Switch>
        <Route path="main" component={DeviceMain}/>
        <Route path="topology" component={DeviceTopology}/>
        {/*<Route path="monitor"/>*/}
        <Route path="connected" component={DeviceConnectedContainer}/>
        <Route path="info" component={DeviceInfoContainer}/>
        <Route path="list" component={GroupDevicesContainer}/>
      </Switch>
    )
  }
}
