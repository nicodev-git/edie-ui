import React from 'react'
import moment from 'moment'
import InfoIcon from 'material-ui/svg-icons/action/info'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

import LineChart from './LineChart'
import BarChart from './BarChart'
import IncidentTable from './IncidentTable'

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
    if (graphType === 'line') {
      return (
        <LineChart chartData={chartData} />
      )
    } else if (graphType === 'bar') {
      return (
        <BarChart chartData={chartData} />
      )
    } else if (graphType === 'table') {
      return (
        <IncidentTable params={searchParams} />
      )
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

  renderFront () {
    const {
      searchParams, graphType, splitBy, splitUnit, searchRecordCounts
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
          <div className={graphType === 'table' ? 'hidden' : ''}>
            <div className="pull-left form-inline">
              <label><small>Duration {moment(searchParams.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
                {moment(searchParams.dateTo, dateFormat).format('MMM D, YYYY')} resolution {splitBy} {splitUnit}</small></label>
            </div>
          </div>
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
