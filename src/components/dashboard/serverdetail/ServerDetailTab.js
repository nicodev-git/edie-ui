export default (deviceId, templateName) => {
  const items = [{
    title: 'Main',
    path: `/dashboard/servers/${deviceId}/detail`
  }, {
    title: 'Monitors',
    path: `/dashboard/servers/${deviceId}/detail/monitors`
  }, {
    title: 'Products',
    path: `/dashboard/servers/${deviceId}/detail/products`
  }, {
    title: 'Event Logs',
    path: `/dashboard/servers/${deviceId}/detail/eventlog`,
    exclude: ['Linux Server']
  }, {
    title: 'Applications',
    path: `/dashboard/servers/${deviceId}/detail/app`,
    exclude: ['Linux Server']
  }, {
    title: 'Processes',
    path: `/dashboard/servers/${deviceId}/detail/process`
  }, {
    title: 'Services',
    path: `/dashboard/servers/${deviceId}/detail/service`
  }, {
    title: 'Users',
    path: `/dashboard/servers/${deviceId}/detail/user`
  }, {
    title: 'Firewall',
    path: `/dashboard/servers/${deviceId}/detail/firewall`
  }, {
    title: 'Network',
    path: `/dashboard/servers/${deviceId}/detail/network`
  }]

  if (templateName) {
    return items.filter(p => !p.exclude || p.exclude.indexOf(templateName) < 0)
  }
  return items
}
