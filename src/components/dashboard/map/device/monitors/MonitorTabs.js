export default (deviceId) => {
  return [{
    title: 'Monitors',
    path: `/device/${deviceId}/monitor`
  }, {
    title: 'Event Logs',
    path: `/device/${deviceId}/monitor/eventlog`
  }, {
    title: 'Applications',
    path: `/device/${deviceId}/monitor/app`
  }, {
    title: 'Processes',
    path: `/device/${deviceId}/monitor/process`
  }, {
    title: 'Services',
    path: `/device/${deviceId}/monitor/service`
  }, {
    title: 'Users',
    path: `/device/${deviceId}/monitor/user`
  }, {
    title: 'Firewall',
    path: `/device/${deviceId}/monitor/firewall`
  }, {
    title: 'Network',
    path: `/device/${deviceId}/monitor/network`
  }, {
    title: 'Command',
    path: `/device/${deviceId}/monitor/command`
  }]
}
