export const rolePermissions = [
  'Dashboard',
  'EditDashboard',

  'Map',
  'AddMap',
  'EditMap',

  'Servers',
  'CommandLine',
  'AddServer',
  'EditServer',

  'Workflows',
  'EditWorkflow',

  'Apps',
  'EditApps',

  'Search',
  'EditSearch',

  'DeviceWorkflows',
  'EditDeviceWorkflow',

  'Logs',
  'EditLogs',

  'Incidents',
  'EditIncidents',

  'Chat',
  'EditChat',

  'ThreatMap',
  'EditThreatMap',

  'Settings',
  'EditSettings'
]


export function hasPermission(user, permission) {
  // if (!(user && user.permissions && user.permissions.includes(permission))) {
  //   return false
  // }
  return true
}