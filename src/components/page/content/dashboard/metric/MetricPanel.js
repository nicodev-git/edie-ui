import React from 'react'
import Metric from '../../../../shared/Metric'

import AttackersModal from './AttackersModal'

export default class MetricPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showAttackers: false
    }
  }

  componentWillMount () {
    this.loadCounts()
  }

  loadCounts () { }

  showOpenIncidentsDiv () {
    this.showIncidentSearch('')
  }

  showTodayIncidentsDiv () {
    this.showIncidentSearch('today')
  }

  showIpIncidentsDiv () {
    this.setState({ showAttackers: true })
  }

  showMonthIncidentsDiv () {
    this.showIncidentSearch('month')
  }

  showIncidentSearch (filterType) {
    const {router} = this.props
    router.push({
      pathname: '/search/incidents',
      state: {
        filterType
      }
    })
  }

  renderAttackers () {
    if (!this.state.showAttackers) return
    return (
      <AttackersModal onClose={() => {
        this.setState({ showAttackers: false })
      }} />
    )
  }

  render () {
    const {stats} = this.props

    return (
      <div className="row news-info">
        <div className="col-sm-3 col-lg-3 col-xs-6">
          <Metric icon="fa-tags" title="Open Incidents" value={stats.open} className="panel-body-inverse"
            onClick={this.showOpenIncidentsDiv.bind(this)}/>
        </div>
        <div className="col-sm-3 col-lg-3 col-xs-6">
          <Metric icon="fa-trophy" title="Today's Incidents" value={stats.today} className="panel-body-inverse"
            onClick={this.showTodayIncidentsDiv.bind(this)}/>
        </div>
        <div className="col-sm-3 col-lg-3 col-xs-6">
          <Metric icon="fa-chain-broken" title="Attackers Today" value={stats.attackers} className="panel-body-inverse"
            onClick={this.showIpIncidentsDiv.bind(this)}/>
        </div>
        <div className="col-sm-3 col-lg-3 col-xs-6">
          <Metric icon="fa-users" title="Month Incidents" value={stats.month} className="panel-body-inverse"
            onClick={this.showMonthIncidentsDiv.bind(this)}/>
        </div>

        {this.renderAttackers()}
      </div>
    )
  }
}
