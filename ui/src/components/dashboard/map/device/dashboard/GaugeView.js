import React from 'react'
import moment from 'moment'
import axios from 'axios'
import {RaisedButton} from 'material-ui'

import InfoIcon from 'material-ui/svg-icons/action/info'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

import LineChart from './LineChart'
import BarChart from './BarChart'

import { ROOT_URL } from 'actions/config'

const sampleData = []

export default class GaugeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      splitBy: 1,
      splitUnit: 'day',
      chartData: [],
      loading: true,
      searchRecordCounts: []
    }
  }
  componentWillMount () {
    this.fetchRecordCount()
  }
  fetchRecordCount () {
    const {splitBy, splitUnit} = this.state
    const params = { ...this.props.params, splitBy, splitUnit }
    axios.get(`${ROOT_URL}/search/getRecordCount`, {params}).then(res => {
      this.setState({
        searchRecordCounts: res.data,
        loading: false
      })
    })
  }
  onChangeSplitBy (e) {
    this.setState({splitBy: e.target.value}, () => {
      this.fetchRecordCount()
    })
  }
  onChangeSplitUnit (e) {
    this.setState({splitUnit: e.target.value}, () => {
      this.fetchRecordCount()
    })
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

  renderChart (graphType, chartData) {
    if (graphType === 'line') {
      return (
        <LineChart chartData={chartData} />
      )
    } else if (graphType === 'bar') {
      return (
        <BarChart chartData={chartData} />
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
      params, graphType
    } = this.props
    const {splitBy, splitUnit, searchRecordCounts} = this.state

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
          <div>
            <div className="pull-left form-inline">
              <label><small>Duration {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
                {moment(params.dateTo, dateFormat).format('MMM D, YYYY')} resolution {splitBy} {splitUnit}</small></label>
            </div>
          </div>
          <div className="flex-1">
            {this.renderChart(graphType, chartData)}
            {this.renderInfoIcon()}
          </div>
          {this.state.loading ? <RefreshOverlay /> : null}
        </div>
    )
  }

  renderBack () {
    const {splitBy, splitUnit} = this.state
    return (
      <div className={`card-back ${this.getFlipClass()}`}>
        <div>
          Resolution:
          <select
            className="form-control input-sm select-custom" value={splitBy}
            style={{fontSize: '11px'}}
            onChange={this.onChangeSplitBy.bind(this)}>
            <option value="1">&nbsp;1</option>
            <option value="2">&nbsp;2</option>
            <option value="3">&nbsp;3</option>
            <option value="5">&nbsp;5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>

          <select
            className="form-control input-sm select-custom" value={splitUnit}
            style={{fontSize: '11px'}}
            onChange={this.onChangeSplitUnit.bind(this)}>
            <option value="minute">Minute(s)</option>
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
            <option value="month">Month(s)</option>
          </select>
        </div>

        <RaisedButton label="Done" onTouchTap={this.onClickInfoIcon.bind(this)}/>
      </div>
    )
  }

  render () {
    return this.renderFront()
  }
}
