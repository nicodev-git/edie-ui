import React from 'react'

import MetricPanel from './top_metric/MetricPanel'
import Map from './map/Map'
import MainIncidentPanel from './incidents/MainIncidentPanel'

export default class Dashboard extends React.Component {
  componentWillMount () {
    this.props.fetchDashboardStats()
  }

  render () {
    return (
      <div className={`flex-vertical flex-1 ${this.props.hidden ? 'hidden' : ''}`}>
        <MetricPanel {...this.props}/>
        <Map {...this.props}/>
        <MainIncidentPanel {...this.props}/>
      </div>
    )
  }
}
