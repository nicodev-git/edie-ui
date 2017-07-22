import React from 'react'

export default class GaugeView extends React.Component {
  render () {
    const {
      chartData, chartOptions, queryChips, params, graphParams,
      onChangeSplitBy, onChangeSplitUnit
    } = this.props

    return (
      <div>
        <div className="pull-left form-inline margin-md-bottom">
          <label><small>Duration {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.dateTo, dateFormat).format('MMM D, YYYY')} resolution</small></label>

          <select
            className="form-control input-sm select-custom" value={graphParams.splitBy}
            onChange={onChangeSplitBy}>
            <option value="1">&nbsp;1</option>
            <option value="2">&nbsp;2</option>
            <option value="3">&nbsp;3</option>
            <option value="5">&nbsp;5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>

          <select
            className="form-control input-sm select-custom" value={graphParams.splitUnit}
            onChange={onChangeSplitUnit}>
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
        {this.renderLoading()}
      </div>
    )
  }
}
