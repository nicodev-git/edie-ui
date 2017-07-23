import React from 'react'
import moment from 'moment'
import axios from 'axios'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

import LineChart from './LineChart'
import { ROOT_URL } from 'actions/config'

const chipStyle = {
  color: 'white',
  background: '#1775C3',
  borderRadius: 4,
  fontSize: '11px',
  padding: '4px 8px',
  margin: '2px 4px',
  display: 'inline-block'
}

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
    const {params} = this.props
    axios.get(`${ROOT_URL}/search/getRecordCount`, {params}).then(res => {
      this.setState({
        searchRecordCounts: res.data,
        loading: false
      })
    })
  }
  onChangeSplitBy (e) {
    this.setState({splitBy: e.target.value})
  }
  onChangeSplitUnit (e) {
    this.setState({splitUnit: e.target.value})
  }
  render () {
    const {
      queryChips, params
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
      <div className="flex-vertical flex-1">
        <div>
          <div className="pull-left form-inline">
            <label><small>Duration {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
              {moment(params.dateTo, dateFormat).format('MMM D, YYYY')} resolution</small></label>

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
          <div className="pull-right text-right">
            <div><small>Search Keywords:</small></div>
          </div>
          <div className="pull-right margin-md-bottom text-right">
            {queryChips.map((p, i) =>
              <div key={i} style={chipStyle}>
                {p.name !== '_all' ? <b>{p.name}: </b> : null}{p.value}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <LineChart chartData={chartData} />
        </div>
        {this.state.loading ? <RefreshOverlay /> : null}
      </div>
    )
  }
}
