import React from 'react'
import HomeIcon from 'material-ui/svg-icons/action/home'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ChatIcon from 'material-ui/svg-icons/communication/chat'
import BugReportIcon from 'material-ui/svg-icons/action/bug-report'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import { sidebarIconsColor } from 'style/materialStyles'

const home = <HomeIcon color={sidebarIconsColor}/>
const search = <SearchIcon color={sidebarIconsColor}/>
const chat = <ChatIcon color={sidebarIconsColor}/>
const threatmap = <BugReportIcon color={sidebarIconsColor}/>
const incidents = <NotificationsNoneIcon color={sidebarIconsColor}/>
const settings = <SettingsIcon color={sidebarIconsColor}/>

export const mainMenu = [
  {id: 'dashboard', title: 'Dashboard', icon: home, path: '/'},
  {id: 'search', title: 'Search', icon: search, path: '/search'},
  {id: 'chat', title: 'Chat', icon: chat, path: '/chat'},
  {id: 'threatmap', title: 'Threat Map', icon: threatmap, path: '/threatmap'},
  {id: 'incidents', title: 'Incidents', icon: incidents, path: '/incidents', badge: true},
  {id: 'settings', title: 'Settings', icon: settings, path: '/settings'}
]

export const deviceMenu = (deviceId) => {
  return [
    {id: 'dashboard', title: 'Dashboard', icon: home, path: '/'},
    {id: 'topology', title: 'Topology', icon: threatmap, group: true, path: `/device/${deviceId}/topology`},
    {id: 'devices', title: 'Devices', icon: chat, group: true, path: `/device/${deviceId}/list`},
    {id: 'incidents', title: 'Incidents', icon: incidents, path: `/device/${deviceId}/main`},
    {id: 'monitors', title: 'Monitors', icon: chat, path: `/device/${deviceId}/monitor`},
    {id: 'connected', title: 'Connected Devices', icon: search, path: `/device/${deviceId}/connected`},
    {id: 'deviceinfo', title: 'Device Info', icon: settings, path: `/device/${deviceId}/info`}
  ]
}

export const contentType = {
  Device: 'device',
  Main: 'main'
}
