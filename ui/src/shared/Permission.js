export const rolePermissions = [
  'Dashboard',

  'Map',
  'AddMap',
  'EditMap',

  'Servers',
  'Workflows',
  'Apps',
  'Search',
  'DeviceWorkflows',
  'Logs',
  'Incidents',
  'Chat',
  'ThreatMap',
  'Settings',

  'CommandLine',
  'AddServer',
  'EditServer'
]


export function hasPermission(user, permission) {
  if (!(user && user.permissions && user.permissions.includes(permission))) {
    return false
  }
  return true
}