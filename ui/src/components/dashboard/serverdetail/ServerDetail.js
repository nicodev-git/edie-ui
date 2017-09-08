import React from 'react'
import {findIndex} from 'lodash'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import RefreshOverlay from 'components/common/RefreshOverlay'

export default class ServerDetail extends React.Component {
  getDeviceId () {
    return this.props.match.params.id
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  componentWillMount () {
    this.props.fetchDevice(this.getDeviceId())
  }

  render () {
    const device = this.getDevice()
    if (!device) return <RefreshOverlay/>
    // return (
    //   <Switch>
    //     <Route path="/serverdetail/:id" exact component={DeviceMonitorsContainer}/>
    //     <Route path="/serverdetail/:id/eventlog" component={DeviceEventLogs}/>
    //     <Route path="/serverdetail/:id/app" component={DeviceApps}/>
    //     <Route path="/serverdetail/:id/process" component={DeviceProcesses}/>
    //     <Route path="/serverdetail/:id/service" component={DeviceServices}/>
    //     <Route path="/serverdetail/:id/user" component={DeviceUsers}/>
    //     <Route path="/serverdetail/:id/firewall" component={DeviceFirewall}/>
    //     <Route path="/serverdetail/:id/network" component={DeviceNetwork}/>
    //     <Route path="/serverdetail/:id/command" component={DeviceCommand}/>
    //   </Switch>
    // )
    return null
  }
}
