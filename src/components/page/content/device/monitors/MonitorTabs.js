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
  }]
}
