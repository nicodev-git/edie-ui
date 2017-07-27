import React from 'react'
import moment from 'moment'
import InfoIcon from 'material-ui/svg-icons/action/info'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

import LineChart from './display/LineChart'
import BarChart from './display/BarChart'
import IncidentTable from './display/IncidentTable'
import LiquidView from './display/LiquidView'
import AccelMeterView from "./display/AccelMeterView"

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

  renderChart (graphType, chartData, searchParams) {
    const {gauge} = this.props
    switch (graphType) {
      case 'line':
        return (
          <LineChart chartData={chartData} />
        )
      case 'bar':
        return (
          <BarChart chartData={chartData} />
        )
      case 'liquid':
        return (
          <LiquidView title={gauge.name}/>
        )
      case 'accel':
        return (
          <AccelMeterView title={gauge.name}/>
        )
      case 'table': {
        const {duration, durationUnit} = this.props
        return (
          <IncidentTable params={searchParams} duration={duration} durationUnit={durationUnit}/>
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
    const {searchParams, graphType, splitBy, splitUnit} = this.props
    if (graphType !== 'line' && graphType !== 'bar') return null
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
      searchParams, graphType, searchRecordCounts
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
            {this.renderChart(graphType, chartData, searchParams)}
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
