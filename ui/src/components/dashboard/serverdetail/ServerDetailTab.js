export default (deviceId, templateName) => {
  const items = [{
    title: 'Main',
    path: `/serverdetail/${deviceId}`
  }, {
    title: 'Event Logs',
    path: `/serverdetail/${deviceId}/eventlog`,
    exclude: ['Linux Server']
  }, {
    title: 'Applications',
    path: `/serverdetail/${deviceId}/app`,
    exclude: ['Linux Server']
  }, {
    title: 'Processes',
    path: `/serverdetail/${deviceId}/process`
  }, {
    title: 'Services',
    path: `/serverdetail/${deviceId}/service`
  }, {
    title: 'Users',
    path: `/serverdetail/${deviceId}/user`
  }, {
    title: 'Firewall',
    path: `/serverdetail/${deviceId}/firewall`
  }, {
    title: 'Network',
    path: `/serverdetail/${deviceId}/network`
  }, {
    title: 'Command',
    path: `/serverdetail/${deviceId}/command`
  }]

  if (templateName) {
    return items.filter(p => !p.exclude || p.exclude.indexOf(templateName) < 0)
  }
  return items
}
