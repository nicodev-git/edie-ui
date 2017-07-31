import React from 'react'
import moment from 'moment'
import {findIndex} from 'lodash'
import axios from 'axios'

import { ROOT_URL } from 'actions/config'
import { dateFormat } from 'shared/Global'

import FlipView from './FlipView'
import BarChart from './display/BarChart'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

const sampleData = []


const chartOptions = {
  legend: {
    display: false
  },
  elements: {
    bar: {
      tension: 0
    }
  },
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        callback: function(value, index, values) {
          if (Math.floor(value) === value) return value
        }
      }
    }]
  }
}

export default class GBarChart extends React.Component {
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
    this.fetchRecordCount(this.props)
  }

  componentWillUpdate (nextProps) {
    const {gauge} = nextProps
    if (gauge && JSON.stringify(this.props.gauge) !== JSON.stringify(gauge)) {
      this.fetchRecordCount(nextProps)
    }
  }

  fetchRecordCount (props) {
    const {gauge, searchList} = props
    const {savedSearchId, monitorId, resource, duration, durationUnit, splitBy, splitUnit} = gauge

    this.setState({
      loading: true
    })

    if (resource === 'monitor') {
      const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf('day').valueOf()
      const dateTo = moment().endOf('day').valueOf()

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

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
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
          <BarChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          searchList={this.props.searchList}
          gauge={this.props.gauge}
          monitors={this.props.monitors}
          onSubmit={this.onSubmit.bind(this, options)}
        />
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

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
