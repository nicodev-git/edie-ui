export default (deviceId) => {
  return [
    {
      title: 'Incidents',
      path: `/device/main/incidents`
    },
    // {
    //   title: 'Rules',
    //   path: `/device/main/rules`
    // },
    {
      title: 'Workflows',
      path: `/device/main/workflows`
    },
    // {
    //   title: 'Raw Incidents',
    //   path: `/device/main/rawIncidents`
    // },
    {
      title: 'Events',
      path: `/device/main/events`
    },
    {
      title: 'Advanced',
      path: `/device/main/advanced`
    }
  ]
}
