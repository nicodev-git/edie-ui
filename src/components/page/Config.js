export const mainMenu = [
  {id: 'dashboard', title: 'Dashboard', icon: 'fa-home', path: '/'},
  {id: 'search', title: 'Search', icon: 'fa-search', path: '/search'},
  {id: 'chat', title: 'Chat', icon: 'fa-comment', path: '/chat'},
  {id: 'threatmap', title: 'Threat Map', icon: 'fa-bolt', path: '/threatmap'},
  {id: 'incidents', title: 'Incidents', icon: ' fa-exclamation-triangle', path: '/incidents'},
  {id: 'settings', title: 'Settings', icon: 'fa-wrench', path: '/settings'}
]

export const deviceMenu = (deviceId) => {
  return [
    {id: 'dashboard', title: 'Dashboard', icon: 'fa-home', path: '/'},
    {id: 'topology', title: 'Topology', icon: 'fa-sitemap', group: true, path: '/device/topology'},
    {id: 'devices', title: 'Devices', icon: 'fa-tablet', group: true, path: '/device/list'},
    {id: 'incidents', title: 'Incidents', icon: 'fa-th-list', path: '/device/main'},
    {id: 'monitors', title: 'Monitors', icon: 'fa-desktop', path: '/device/monitor'},
    {id: 'connected', title: 'Connected Devices', icon: 'fa-code-fork', path: '/device/connected'},
    {id: 'deviceinfo', title: 'Device Info', icon: 'fa-wrench', path: '/device/info'}
  ]
}

export const contentType = {
  Device: 'device',
  Main: 'main'
}
