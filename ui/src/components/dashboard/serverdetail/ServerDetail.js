import React from 'react'
import {findIndex} from 'lodash'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import MainControl from 'containers/dashboard/serverdetail/MainControlContainer'
import EventLogs from 'containers/dashboard/serverdetail/EventLogsContainer'
import Apps from 'containers/dashboard/serverdetail/AppsContainer'
import Processes from 'containers/dashboard/serverdetail/ProcessContainer'
import Services from 'containers/dashboard/serverdetail/ServiceContainer'
import Users from 'containers/dashboard/serverdetail/UsersContainer'
import Firewall from 'containers/dashboard/serverdetail/FirewallContainer'
import Network from 'containers/dashboard/serverdetail/NetworkContainer'
import Command from 'containers/dashboard/serverdetail/CommandContainer'

import RefreshOverlay from 'components/common/RefreshOverlay'

export default class ServerDetail extends React.Component {
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

  componentWillMount () {
    this.props.fetchDevice(this.getDeviceId())
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

  render () {
    const device = this.getDevice()
    if (!device) return <RefreshOverlay/>
    return (
      <Switch>
        <Route path="/serverdetail/:id" exact component={MainControl}/>
        <Route path="/serverdetail/:id/eventlog" component={EventLogs}/>
        <Route path="/serverdetail/:id/app" component={Apps}/>
        <Route path="/serverdetail/:id/process" component={Processes}/>
        <Route path="/serverdetail/:id/service" component={Services}/>
        <Route path="/serverdetail/:id/user" component={Users}/>
        <Route path="/serverdetail/:id/firewall" component={Firewall}/>
        <Route path="/serverdetail/:id/network" component={Network}/>
        <Route path="/serverdetail/:id/command" component={Command}/>
      </Switch>
    )
  }
}
