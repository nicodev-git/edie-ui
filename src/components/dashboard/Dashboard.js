import React from 'react'

import MetricPanel from './top_metric/MetricPanel'
import Map from './map/Map'
import MainIncidentPanel from './incidents/MainIncidentPanel'

export default class Dashboard extends React.Component {
  componentWillMount () {
    this.props.fetchDashboardStats()
  }

  isBigIncidents () {
    const {pathname, search} = this.props.location
    return (pathname === '/' && search === '?bigincidents=')
  }
  render () {
    const hidden = this.isBigIncidents()
    return (
      <div className={`flex-vertical flex-1 ${hidden ? 'hidden' : ''}`}>
        <MetricPanel {...this.props}/>
        <Map {...this.props}/>
        <MainIncidentPanel {...this.props}/>
      </div>
    )
  }
}
