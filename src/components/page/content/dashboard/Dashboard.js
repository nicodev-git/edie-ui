import React from 'react'
import MetricPanelContainer from '../../../../containers/page/content/dashboard/metric/MetricPanelContainer'
import MapContainer from '../../../../containers/page/content/dashboard/map/MapContainer'
import MainIncidentPanel from './incidents/MainIncidentPanel'

export default class Dashboard extends React.Component {
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
    const { hidden } = this.props
    return (
      <div className={`flex-vertical flex-1 ${hidden ? 'hidden' : ''}`}>
        <MetricPanelContainer />
        <MapContainer hidden={hidden}/>
        <MainIncidentPanel hidden={hidden}/>
      </div>
    )
  }
}
