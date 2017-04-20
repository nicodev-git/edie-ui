import React from 'react'
import MetricPanelView from './MetricPanelView'
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
    this.showIncidentSearch('open')
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
      pathname: '/search',
      state: {
        filterType
      }
    })
  }

  renderAttackers () {
    if (!this.state.showAttackers) return
    return (
      <AttackersModal {...this.props} onClose={() => {
        this.setState({ showAttackers: false })
      }} />
    )
  }

  render () {
    const {stats} = this.props
    let attackers = this.renderAttackers()
    return (
      <MetricPanelView
        stats={stats}
        showOpen={this.showOpenIncidentsDiv.bind(this)}
        showToday={this.showTodayIncidentsDiv.bind(this)}
        showAttackers={this.showIpIncidentsDiv.bind(this)}
        showMonth={this.showMonthIncidentsDiv.bind(this)}
        attackers={attackers}
      />
    )
  }
}
