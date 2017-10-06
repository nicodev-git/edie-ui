export default (deviceId, templateName) => {
  const items = [{
    title: 'Main',
    path: `/dashboard/serverdetail/${deviceId}`
  }, {
    title: 'Event Logs',
    path: `/dashboard/serverdetail/${deviceId}/eventlog`,
    exclude: ['Linux Server']
  }, {
    title: 'Applications',
    path: `/dashboard/serverdetail/${deviceId}/app`,
    exclude: ['Linux Server']
  }, {
    title: 'Processes',
    path: `/dashboard/serverdetail/${deviceId}/process`
  }, {
    title: 'Services',
    path: `/dashboard/serverdetail/${deviceId}/service`
  }, {
    title: 'Users',
    path: `/dashboard/serverdetail/${deviceId}/user`
  }, {
    title: 'Firewall',
    path: `/dashboard/serverdetail/${deviceId}/firewall`
  }, {
    title: 'Network',
    path: `/dashboard/serverdetail/${deviceId}/network`
  }, {
    title: 'Command',
    path: `/dashboard/serverdetail/${deviceId}/command`
  }]

  if (templateName) {
    return items.filter(p => !p.exclude || p.exclude.indexOf(templateName) < 0)
  }
  return items
}
