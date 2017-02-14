export default (deviceId) => {
  return [{
    title: 'Incidents',
    path: `/device/${deviceId}/main/incidents`
  },
  // {
  //   title: 'Rules',
  //   path: `/device/${deviceId}/rules`
  // },
  {
    title: 'Workflows',
    path: `/device/${deviceId}/main/workflows`
  },
  // {
  //   title: 'Raw Incidents',
  //   path: `/device/${deviceId}/rawIncidents`
  // },
  {
    title: 'Events',
    path: `/device/${deviceId}/main/events`
  },
  {
    title: 'Advanced',
    path: `/device/${deviceId}/main/advanced`
  }]
}
