import React from 'react'

import MetricPanel from './top_metric/MetricPanel'
import Map from './map/Map'
import MainIncidentPanel from './incidents/MainIncidentPanel'

export default class Dashboard extends React.Component {
  componentWillMount () {
    this.props.fetchDashboardStats()
  }

  isHidden () {
    const {pathname, search} = this.props.location
    return (pathname !== '/' || !!search)
  }

  getOption (key) {
    const list = (this.props.envVars || []).filter(u => u.envvars && u.envvars.key === key)
    if (list.length) return list[0]
    return null
  }

  getOptionValue (key, value = 'value1') {
    const option = this.getOption(key)
    if (!option) return ''
    return option.envvars[value]
  }

  render () {
    const hidden = this.isHidden()
    const showTraffic = hidden ? false : this.getOptionValue('NETWORK_TRAFFIC') === 'true'
    return (
      <div className={`flex-vertical flex-1 ${hidden ? 'hidden' : ''}`} hidden={hidden}>
        <MetricPanel {...this.props}/>
        {this.props.mapClick ? <Map {...this.props} hidden={hidden} showTraffic={showTraffic}/> : null}
        {this.props.mapClick ? <MainIncidentPanel {...this.props} hidden={hidden}/> : null}
      </div>
    )
  }
}
