import React, { Component } from 'react'
import moment from 'moment'
import { assign } from 'lodash'

import IncidentTable from '../dashboard/incidents/IncidentTable'
import BigIncidentsView from '../../../modal/BigIncidentsView'

const severities = [
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Audit', value: 'AUDIT' },
  { label: 'Ignore', value: 'IGNORE' }
]

class BigIncidents extends Component {
  constructor (props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentWillMount () {
    this.props.updateBigIncidentParams({
      deviceid: '*',
      description: '',
      fixed: null,
      severity: ['HIGH', 'MEDIUM'],
      afterStartTimestamp: moment().add(-6, 'days').valueOf(),
      beforeStartTimestamp: moment().valueOf(),
      sort: 'startTimestamp,desc'
    })
  }

  componentDidMount () {
    this.updateDimensions()
    window.addEventListener('resize', this.onResize, false)
    this.onFilterChange()
  }

  componentDidUpdate () {
    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize () {
    if (this.rqf) return
    this.rqf = window.setTimeout(() => {
      this.rqf = null
      this.updateDimensions()
    }, 50)
  }

  updateDimensions () {
    /* const container = this.refs.tableContainer
    if (!container) {
      throw new Error('Cannot find container div')
    }

    if (this.props.tableHeight === container.clientHeight) return

    this.setState({
      tableHeight: container.clientHeight
    }) */
  }

  renderTable () {
    return (
      <IncidentTable
        incidents={this.props.incidents}
        fixIncident={this.props.fixIncident}
        ackIncident={this.props.ackIncident}
      />
    )
  }

  onHide () {
    this.props.router.goBack()
  }

  onFilterChange () {
    /* const refs = this.refs
    const {search, fixed, dp} = refs

    let params = {
      description: search.value || '""',
      severity: this.props.selectedSeverity,
      afterStartTimestamp: dp.getStartDate().valueOf(),
      beforeStartTimestamp: dp.getEndDate().valueOf(),
      sort: 'startTimestamp,desc'
    }
    if (fixed.value) params.fixed = fixed.value

    this.props.fetchBigIncidents(params) */
  }

  onChangeSeverity (selected) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      severity: selected.map(item => item.value)
    }))
  }

  onChangeFixed (event) {
    /* let index = event.nativeEvent.target.selectedIndex
    let text = event.nativeEvent.target[index].text

    this.setState({
      templateText: text
    }, () => {
      this.setState({
        selectWidth: $(this.refs.templateSelect).width() * 1.03 // eslint-disable-line no-undef
      })
    }) */
  }

  onChangeDateRange ({startDate, endDate}) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      afterStartTimestamp: startDate.valueOf(),
      beforeStartTimestamp: endDate.valueOf()
    }))
  }

  onChangeFixedStatus (e) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      fixed: e.target.value || null
    }))
  }

  onChangeKeyword (e) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      description: e.target.value
    }))
  }

  render () {
    const { bigIncidentParams } = this.props
    if (!bigIncidentParams) return null

    return (
      <BigIncidentsView
        onHide={this.onHide.bind(this)}
        severities={bigIncidentParams.severity.join(',')}
        severityOptions={severities}
        onChangeSeverity={this.onChangeSeverity.bind(this)}

        startDate={moment(bigIncidentParams.afterStartTimestamp)}
        endDate={moment(bigIncidentParams.beforeStartTimestamp)}
        onChangeDateRange={this.onChangeDateRange.bind(this)}

        fixedStatus={bigIncidentParams.fixed}
        onChangeFixedStatus={this.onChangeFixedStatus.bind(this)}

        keyword={bigIncidentParams.description}
        onChangeKeyword={this.onChangeKeyword.bind(this)}

        table={this.renderTable()}
      />
    )
  }
}

export default BigIncidents
