import React from 'react'
import moment from 'moment'
import {Line} from 'react-chartjs-2'

import {dateFormat} from 'shared/Global'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class GaugeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      splitBy: 1,
      splitUnit: 'day'
    }
  }
  componentWillMount () {

  }
  onChangeSplitBy () {
  }
  onChangeSplitUnit () {
  }
  render () {
    const {
      chartData, chartOptions, queryChips, params
    } = this.props
    const {splitBy, splitUnit} = this.state

    return (
      <div>
        <div className="pull-left form-inline margin-md-bottom">
          <label><small>Duration {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.dateTo, dateFormat).format('MMM D, YYYY')} resolution</small></label>

          <select
            className="form-control input-sm select-custom" value={splitBy}
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
            onChange={this.onChangeSplitUnit.bind(this)}>
            <option value="minute">Minute(s)</option>
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
            <option value="month">Month(s)</option>
          </select>
        </div>
        <div className="pull-right margin-md-bottom text-right">
          <div><small>Search Keywords:</small></div>
          {queryChips.map((p, i) =>
            <div key={i} style={chipStyle}>
              {p.name !== '_all' ? <b>{p.name}: </b> : null}{p.value}
            </div>
          )}
        </div>
        <div className="margin-md-top">
          <Line data={chartData} options={chartOptions} width="800" height="250" />
        </div>
        {this.props.loading ? <RefreshOverlay /> : null}
      </div>
    )
  }
}
