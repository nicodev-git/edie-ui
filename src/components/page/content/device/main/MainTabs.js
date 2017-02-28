export default (deviceId) => {
  return [{
    title: 'Incidents',
    path: `/device/${deviceId}/main/incidents`
  },
  {
    title: 'Workflows',
    path: `/device/${deviceId}/main/workflows`
  },
  {
    title: 'Events',
    path: `/device/${deviceId}/main/events`
  },
  {
    title: 'Advanced',
    path: `/device/${deviceId}/main/advanced`
  }]
}
