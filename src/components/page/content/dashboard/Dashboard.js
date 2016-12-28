import React from 'react'
import { connect } from 'react-redux'

import MetricPanel from './metric/MetricPanel'
import Map from './map/Map'
import MainIncidentPanel from './incidents/MainIncidentPanel'

import { updateDashboard } from '../../../../actions/DashboardActions'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.onDashboardUpdate = this.onDashboardUpdate.bind(this)
  }

  componentDidMount () {
        // incidentSocket.init('MainIncident')
        // incidentSocket.addListener('dashboard', this.onDashboardUpdate)
        //
        // incidentSocket.connect()
  }

  componentWillUnmount () {
        // incidentSocket.removeListener('dashboard', this.onDashboardUpdate)
        // incidentSocket.close()
  }

  onDashboardUpdate (msg) {
    console.log('Dashboard message received.')
    this.props.updateDashboard(msg.data)
  }

  render () {
    const {hidden} = this.props
    return (
      <div className={`flex-vertical flex-1 ${hidden ? 'hidden' : ''}`}>
        <MetricPanel />
        <Map hidden={hidden}/>
        <MainIncidentPanel hidden={hidden}/>
      </div>
    )
  }
}
Dashboard.defaultProps = {
  hidden: false
}
export default connect(null, {updateDashboard})(Dashboard)
