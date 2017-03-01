import React from 'react'
import { withRouter } from 'react-router'

import MetricPanel from './metric/MetricPanel'
import Map from './map/Map'
import MainIncidentPanel from './incidents/MainIncidentPanel'

@withRouter
export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onDashboardUpdate = this.onDashboardUpdate.bind(this)
  }

  onDashboardUpdate (msg) {
    console.log('Dashboard message received.')
    this.props.updateDashboard(msg.data)
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
