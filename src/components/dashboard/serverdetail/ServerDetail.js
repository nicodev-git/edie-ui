import React from 'react'
import {findIndex} from 'lodash'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import MainControl from 'containers/dashboard/serverdetail/MainControlContainer'
import Monitors from 'containers/dashboard/serverdetail/DeviceMonitorsContainer'
import EventLogs from 'containers/dashboard/serverdetail/EventLogsContainer'
import Apps from 'containers/dashboard/serverdetail/AppsContainer'
import Processes from 'containers/dashboard/serverdetail/ProcessContainer'
import Services from 'containers/dashboard/serverdetail/ServiceContainer'
import Users from 'containers/dashboard/serverdetail/UsersContainer'
import Firewall from 'containers/dashboard/serverdetail/FirewallContainer'
import Network from 'containers/dashboard/serverdetail/NetworkContainer'

import RefreshOverlay from 'components/common/RefreshOverlay'

export default class ServerDetail extends React.Component {
  getDeviceSlug () {
    return this.props.match.params.name
  }

  findDevice (props) {
    const {devices} = props
    const index = findIndex(devices, {slug: props.match.params.name})
    if (index < 0) return null
    return devices[index]
  }

  getDevice () {
    return this.findDevice(this.props)
  }

  componentWillMount () {
    this.props.fetchDeviceBySlug(this.getDeviceSlug())
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

  render () {
    const device = this.getDevice()
    if (!device) return <RefreshOverlay/>
    return (
      <Switch>
        <Route path="/dashboard/servers/:name/detail" exact component={MainControl}/>
        <Route path="/dashboard/servers/:name/detail/monitors" exact component={Monitors}/>
        <Route path="/dashboard/servers/:name/detail/eventlog" component={EventLogs}/>
        <Route path="/dashboard/servers/:name/detail/app" component={Apps}/>
        <Route path="/dashboard/servers/:name/detail/process" component={Processes}/>
        <Route path="/dashboard/servers/:name/detail/service" component={Services}/>
        <Route path="/dashboard/servers/:name/detail/user" component={Users}/>
        <Route path="/dashboard/servers/:name/detail/firewall" component={Firewall}/>
        <Route path="/dashboard/servers/:name/detail/network" component={Network}/>
      </Switch>
    )
  }
}
