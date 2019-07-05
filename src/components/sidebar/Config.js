import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ChatIcon from '@material-ui/icons/Chat'
import BugReportIcon from '@material-ui/icons/BugReport'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import SettingsIcon from '@material-ui/icons/Settings'
import BackIcon from '@material-ui/icons/ArrowBack'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PlaylistIcon from '@material-ui/icons/PlaylistAddCheck'
import { sidebarIconsColor } from 'style/common/materialStyles'
import MapIcon from '@material-ui/icons/Map'
import DashboardServerIcon from '@material-ui/icons/Devices'
import DashboardWfIcon from '@material-ui/icons/TrendingUp'
import DashboardAppIcon from '@material-ui/icons/SettingsApplications'
import LogIcon from '@material-ui/icons/EventAvailable'
import DeviceWfIcon from '@material-ui/icons/DeveloperBoard'

// const home = <HomeIcon nativeColor={sidebarIconsColor}/>
const search = <SearchIcon nativeColor={sidebarIconsColor}/>
const chat = <ChatIcon nativeColor={sidebarIconsColor}/>
const threatmap = <BugReportIcon nativeColor={sidebarIconsColor}/>
const incidents = <NotificationsNoneIcon nativeColor={sidebarIconsColor}/>
const settings = <SettingsIcon nativeColor={sidebarIconsColor}/>
const back = <BackIcon nativeColor={sidebarIconsColor}/>
const monitors = <PlaylistIcon nativeColor={sidebarIconsColor}/>
const dashboard = <DashboardIcon nativeColor={sidebarIconsColor}/>
const map = <MapIcon nativeColor={sidebarIconsColor}/>
const logIcon = <LogIcon nativeColor={sidebarIconsColor}/>
const deviceWfIcon = <DeviceWfIcon nativeColor={sidebarIconsColor}/>
const dservers = <DashboardServerIcon nativeColor={sidebarIconsColor}/>
const dworkflow = <DashboardWfIcon nativeColor={sidebarIconsColor}/>
const dapp = <DashboardAppIcon nativeColor={sidebarIconsColor}/>

export const mainMenu = [
  {id: 'dashboard', title: 'Dashboard',  icon: dashboard, path: '/dashboard', fixed: true, roleMenuId: 'Dashboard'},
  {id: 'home', title: 'Map', icon: map, path: '/', roleMenuId: 'Map'},
  {id: 'dservers', title: 'Servers', icon: dservers, path: '/dashboard/servers', roleMenuId: 'Servers'},
  {id: 'dworkflow', title: 'Workflows', icon: dworkflow, path: '/workflow', roleMenuId: 'Workflows'},
  {id: 'dapp', title: 'Apps', icon: dapp, path: '/dashboard/apps', dashboard: true, roleMenuId: 'Apps'},
  {id: 'search', title: 'Search', icon: search, path: '/search', roleMenuId: 'Search'},
  {id: 'devicewf', title: 'Device Workflow', icon: deviceWfIcon, path: '/devicewf', roleMenuId: 'DeviceWorkflows'},
  {id: 'log', title: 'Logs', icon: logIcon, path: '/logs', roleMenuId: 'Logs'},
  {id: 'incidents', title: 'Incidents', icon: incidents, path: '/', search: '?bigincidents=', roleMenuId: 'Incidents'},
  {id: 'chat', title: 'Chat', icon: chat, path: '/chat', roleMenuId: 'Chat'},
  {id: 'threatmap', title: 'Threat Map', icon: threatmap, path: '/threatmap', roleMenuId: 'ThreatMap'},
  {id: 'settings', title: 'Settings', icon: settings, path: '/settings', roleMenuId: 'Settings'}
]

export const deviceMenu = (deviceId) => {
  return [
    {id: 'home', title: 'Back', icon: back, path: '/'},
    {id: 'devicemain', title: 'Dashboard', icon: dashboard, path: `/device/${deviceId}/dashboard`},
    {id: 'topology', title: 'Topology', icon: threatmap, group: true, path: `/device/${deviceId}/topology`},
    {id: 'devices', title: 'Devices', icon: chat, group: true, path: `/device/${deviceId}/list`},
    {id: 'incidents', title: 'Incidents', icon: incidents, path: `/device/${deviceId}/main`},
    {id: 'monitors', title: 'Monitors', icon: monitors, path: `/device/${deviceId}/monitor`},
    {id: 'connected', title: 'Connected Devices', icon: search, path: `/device/${deviceId}/connected`},
    {id: 'deviceinfo', title: 'Device Info', icon: settings, path: `/device/${deviceId}/info`}
  ]
}

export const contentType = {
  Device: 'device',
  Main: 'main'
}
