import React from 'react'
import moment from 'moment'
import InfoIcon from 'material-ui/svg-icons/action/info'
import {findIndex} from 'lodash'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

import LineChart from './display/LineChart'
import BarChart from './display/BarChart'
import NormalTable from './display/NormalTable'
import LiquidView from './display/LiquidView'
import AccelMeterView from './display/AccelMeterView'
import IncidentTable from './display/IncidentTable'
import MonitorStatusView from './display/MonitorStatusView'

const sampleData = []

export default class GaugeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
  }
  onMouseEnter () {
    this.setState({
      hovered: true
    })
  }

  onMouseLeave () {
    this.setState({
      hovered: false
    })
  }

  onClickInfoIcon () {
    this.props.onClickFlip()
  }

  renderChart (chartData, searchParams) {
    const {gauge, device} = this.props
    switch (gauge.templateName) {
      case 'Line Chart':
        return (
          <LineChart chartData={chartData} />
        )
      case 'Bar Chart':
        return (
          <BarChart chartData={chartData} />
        )
      case 'Liquid':
        return (
          <LiquidView title={gauge.name}/>
        )
      case 'Accelerometer':
        return (
          <AccelMeterView title={gauge.name}/>
        )
      case 'Table': {
        const {duration, durationUnit} = this.props
        return (
          <NormalTable params={searchParams} duration={duration} durationUnit={durationUnit}/>
        )
      }
      case 'Incident Table': {
        const {duration, durationUnit} = this.props
        return (
          <IncidentTable params={searchParams} duration={duration} durationUnit={durationUnit}/>
        )
      }
      case 'Monitor': {
        const index = findIndex(device.monitors, {uid: gauge.monitorId})
        if (index < 0) return null
        return (
          <MonitorStatusView monitor={device.monitors[index]}/>
        )
      }

      default:
        return null
    }
  }

  renderInfoIcon () {
    const {hovered} = this.state
    return (
      <div
        style={{position: 'absolute', right: -8, bottom: -10}}
        className={`link info-button ${hovered ? 'visible' : ''}`}
        onClick={this.onClickInfoIcon.bind(this)}>
        <InfoIcon size={24}/>
      </div>
    )
  }

  renderDesc () {
    const {searchParams, gauge, splitBy, splitUnit} = this.props
    if ((gauge.templateName !== 'Line Chart' && gauge.templateName !== 'Bar Chart') || gauge.resource !== 'search') return null
    return (
      <div>
        <div className="pull-left form-inline">
          <label><small>Duration {moment(searchParams.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(searchParams.dateTo, dateFormat).format('MMM D, YYYY')} resolution {splitBy} {splitUnit}</small></label>
        </div>
      </div>
    )
  }

  renderFront () {
    const {
      searchParams, searchRecordCounts
    } = this.props

    const chartData = {
      labels: (searchRecordCounts || sampleData).map(p => p.date),
      datasets: [{
        data: (searchRecordCounts || sampleData).map(p => p.count),
        borderWidth: 1,
        borderColor: '#269C8B',
        fill: false
      }]
    }

    return (
      <div className="flex-vertical flex-1" onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        {this.renderDesc()}
        <div className="flex-1 flex-vertical">
          {this.renderChart(chartData, searchParams)}
          {this.renderInfoIcon()}
        </div>
        {this.props.loading ? <RefreshOverlay /> : null}
      </div>
    )
  }

  render () {
    return this.renderFront()
  }
}
