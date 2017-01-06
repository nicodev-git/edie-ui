export default (deviceId) => {
  return [
    {
      title: 'Incidents',
      path: `/device/${deviceId}/incidents`
    },
    // {
    //   title: 'Rules',
    //   path: `/device/${deviceId}/rules`
    // },
    {
      title: 'Workflows',
      path: `/device/${deviceId}/workflows`
    },
    // {
    //   title: 'Raw Incidents',
    //   path: `/device/${deviceId}/rawIncidents`
    // },
    {
      title: 'Events',
      path: `/device/${deviceId}/events`
    },
    {
      title: 'Advanced',
      path: `/device/${deviceId}/advanced`
    }
  ]
}
