import React from 'react'
import moment from 'moment'
import {findIndex} from 'lodash'
import axios from 'axios'

import { ROOT_URL } from 'actions/config'
import { dateFormat } from 'shared/Global'

import FlipView from './FlipView'
import DoneButton from './DoneButton'
import LineChart from './display/LineChart'

const sampleData = []


const chartOptions = {
  legend: {
    display: false
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        callback: function(value, index, values) {
          if (Math.floor(value) === value) {
            return value
          }
        }
      }
    }]
  }
}

const monitorChartOptions = {
  legend: {
    display: false
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        callback: function(value, index, values) {
          if (Math.floor(value) === value) {
            return value === 0 ? 'Down' : 'Up'
          }
        }
      }
    }]
  },
  tooltips: {
    mode: 'label',
    callbacks: {
      label: function(tooltipItem, data) {
        const indice = tooltipItem.index;
        return data.datasets[0].data[indice] === 0 ? 'Down' : 'Up'
      }
    }
  }
}

export default class GLineChart extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      searchRecordCounts: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentWillMount () {
    this.fetchRecordCount()
  }

  fetchRecordCount () {
    const {gauge, searchList} = this.props
    const {savedSearchId, monitorId, resource, duration, durationUnit, splitBy, splitUnit} = gauge

    if (resource === 'monitor') {
      const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).valueOf()
      const dateTo = moment().endOf(durationUnit).valueOf()

      axios.get(`${ROOT_URL}/event/search/findByDate`, {
        params: {
          dateFrom, dateTo, monitorId,
          sort: 'timestamp'
        }
      }).then(res => {
        this.setState({
          searchRecordCounts: res.data._embedded.events.map(p => ({
            date: moment(p.timestamp).format('YYYY-MM-DD HH:mm:ss'),
            count: p.lastResult && p.lastResult.status === 'UP' ? 1 : 0
          })),
          loading: false
        })
      })
    } else {
      const index = findIndex(searchList, {id: savedSearchId})
      if (index < 0) {
        console.log('Saved search not found.')
        return
      }
      const searchParams = JSON.parse(searchList[index].data)

      const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).format(dateFormat)
      const dateTo = moment().endOf(durationUnit).format(dateFormat)

      const params = { ...searchParams, splitBy, splitUnit, dateFrom, dateTo }
      axios.get(`${ROOT_URL}/search/getRecordCount`, {params}).then(res => {
        this.setState({
          searchRecordCounts: res.data,
          loading: false
        })
      })
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {gauge} = this.props
    const {searchRecordCounts} = this.state

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
        <div className="flex-1">
          <LineChart chartData={chartData} chartOptions={gauge.resource === 'monitor' ? monitorChartOptions : chartOptions} />
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        Back View
        <DoneButton onClick={options.onClickFlip}/>
      </div>
    )
  }
  render () {
    return (
      <FlipView
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
