import React from 'react'
import moment from 'moment'
import {findIndex} from 'lodash'
import axios from 'axios'

import { ROOT_URL } from 'actions/config'
import { severities, queryDateFormat, collections, encodeUrlParams } from 'shared/Global'

import FlipView from './FlipView'
import BarChart from './display/BarChart'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import {getRanges} from 'components/common/DateRangePicker'
// import MonitorSocket from 'util/socket/MonitorSocket'

import {buildServiceParams} from 'util/Query'
import {appletColors} from 'shared/Global'

const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'bottom'
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        display: true,
        drawTicks: false,
        drawBorder: false
      },
      ticks: {
        callback: function(value, index, values) {
          return ''
        }
      }
    }],
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        fontColor: '#9e9e9e',
        callback: function(value, index, values) {
          if (Math.floor(value) === value) return value
        }
      },
      gridLines: {
        display: true,
        drawBorder: false
      }
    }]
  }
}

const connectorChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [{
      display: true
    }],
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        fontColor: '#9e9e9e',
        callback: function(value, index, values) {
          if (Math.floor(value) === value) return value
        }
      },
      gridLines: {
        display: true,
        drawBorder: false
      }
    }]
  }
}

export default class GBarChart extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      searchRecordCounts: [],
      labels: [],
      datasets: [],
      needRefresh: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentWillMount () {
    this.fetchRecordCount(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    const {gauge, searchList} = nextProps
    const {needRefresh} = nextState
    if (gauge && JSON.stringify(this.props.gauge) !== JSON.stringify(gauge)) {
      this.fetchRecordCount(nextProps)
    } else if (searchList && JSON.stringify(this.props.searchList) !== JSON.stringify(searchList)) {
      this.fetchRecordCount(nextProps)
    } else if (needRefresh && !this.state.needRefresh) {
      this.fetchRecordCount(nextProps)
    }
  }

  componentWillUnmount () {
    this.stopSocket()
  }

  getParams () {
    const {gauge, searchList} = this.props
    const {savedSearchId, monitorId, resource, workflowId, workflowIds} = gauge

    if (resource === 'monitor') {
      return {
        query: `monitorid=${monitorId}`
      }
    } else if (resource === 'incident'){
      return {
        query: '',
        workflow: [workflowId, ...workflowIds].join(','),
        collections: 'incident',
        severity: severities.map(p => p.value).join(','),
        tag: '',
        monitorTypes: ''
      }
    } else {
      const index = findIndex(searchList, {id: savedSearchId})
      if (index < 0) {
        console.log('Saved search not found.')
        return null
      }
      const searchParams = JSON.parse(searchList[index].data)

      return searchParams
    }
  }

  fetchRecordCount (props) {
    const {gauge, searchList, workflows, devices, allDevices} = props
    const {monitorId, resource, duration, durationUnit,
      splitBy, splitUnit, workflowId, workflowIds, userConnectorId, savedSearchItems} = gauge

    this.setState({
      loading: true
    })

    let inc = 1
    if (durationUnit === 'month' && splitUnit === 'day') inc = 0
    const dateFrom = moment().add(-duration + inc, `${durationUnit}s`)
      .startOf(durationUnit === 'hour' || duration === 1 ? durationUnit : 'day')
    const dateTo = moment().endOf(durationUnit === 'hour' ? durationUnit : 'day')

    if (resource === 'monitor') {
      axios.get(`${ROOT_URL}/event/search/findByDate`, {
        params: {
          dateFrom: dateFrom.valueOf(),
          dateTo: dateTo.valueOf(),
          monitorId,
          sort: 'timestamp'
        }
      }).then(res => {
        const {events} = res.data._embedded
        this.setState({
          labels: events.map(p => moment(p.timestamp).format('YYYY-MM-DD HH:mm:ss')),
          datasets: [{
            label: 'Status',
            data: events.map(p => p.eventType === 'AGENT' || (p.lastResult && p.lastResult.status === 'UP') ? 1 : 0)
          }],
          loading: false,
          needRefresh: false
        })
      }).catch(() => {
        setTimeout(() => {
          this.setState({needRefresh: true})
        }, 5000)
      })
    } else if (resource === 'incident'){
      const params = {
        q: [
          `(workflowids:${[workflowId || '', ...(workflowIds || [])].filter(p => !!p).join(' OR ')})`,
          `(severity:${severities.map(p => p.value).join(' OR ')})`
        ].join(' AND '),
        splitBy,
        splitUnit,
        from: dateFrom.valueOf(),
        to: dateTo.valueOf(),
        types: 'incident'
      }
      axios.get(`${ROOT_URL}/search/getRecordCount`, {params}).then(res => {
        this.setState({
          labels: res.data.map(p => p.date),
          datasets: [{
            label: 'Incident',
            data: res.data.map(p => p.count)
          }],
          loading: false,
          needRefresh: false
        })
      }).catch(() => {
        setTimeout(() => {
          this.setState({needRefresh: true})
        }, 5000)
      })
    } else if (resource === 'userconnector'){
      axios.get(`${ROOT_URL}/event/search/findByUserConnector`, {
        params: {
          dateFrom: dateFrom.valueOf(),
          dateTo: dateTo.valueOf(),
          userConnectorId,
          sort: 'timestamp',
          size: 1000
        }
      }).then(res => {
        const {events} = res.data._embedded
        this.setState({
          labels: events.map(p => moment(p.timestamp).format('MM-DD HH:mm')),
          datasets: [{
            label: 'Value',
            data: events.map(p => parseFloat(p.lastResultData || 0))
          }],

          loading: false,
          needRefresh: false
        })
      }).catch(() => {
        setTimeout(() => {
          this.setState({needRefresh: true})
        }, 5000)
      })
      if (!this.eventSocket) this.startSocket()
    } else {
      const qs = []
      const searchNames = []
      savedSearchItems.forEach(item => {
        const index = findIndex(searchList, {id: item.searchId})
        if (index < 0) {
          console.log('Saved search not found.')
          return
        }
        const searchParams = buildServiceParams(JSON.parse(searchList[index].data), {
          dateRanges: getRanges(),
          collections, severities, workflows,
          allDevices: devices || allDevices,
          queryDateFormat
        })

        qs.push(searchParams.q)
        searchNames.push(item.name)
      })

      const params = {
        qs,
        splitBy,
        splitUnit,
        from: dateFrom.valueOf(),
        to: dateTo.valueOf()
      }
      axios.get(`${ROOT_URL}/search/getRecordCounts?${encodeUrlParams(params)}`).then(res => {
        this.setState({
          labels: res.data.map(p => p.date),
          datasets: qs.map((q, i) => ({
            label: searchNames[i],
            data: res.data.map(p => /* parseInt(Math.random() * 20)*/p.count[i])
          })),
          loading: false,
          needRefresh: false
        })
      }).catch(() => {
        setTimeout(() => {
          this.setState({needRefresh: true})
        }, 5000)
      })
    }
  }

  ////////////////////////////////////////////

  startSocket () {
    // this.eventSocket = new MonitorSocket({
    //   listener: this.onEventUpdate.bind(this)
    // })
    // this.eventSocket.connect(() => {}, 'eventupdate')
  }

  stopSocket() {
    // if (!this.eventSocket) return
    // this.eventSocket.close()
  }

  onEventUpdate (data) {
    const {searchRecordCounts} = this.state
    const {userConnectorId} = this.props.gauge
    if (!data.userConnectorId || data.userConnectorId !== userConnectorId) return

    this.setState({
      searchRecordCounts: [...searchRecordCounts, {
        date: moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        count: parseFloat(data.lastResultData || 0)
      }]
    })
  }

  ////////////////////////////////////////////

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

  onClickPoint (e, elements) {
    if (!elements.length) return
    const el = elements[0]

    const record = this.state.searchRecordCounts[el._index]
    if (!record) {
      console.log('Record not found')
      return
    }
    const params = this.getParams()
    if (record.dateFrom) params.dateFrom = record.dateFrom
    if (record.dateTo) params.dateTo = record.dateTo

    setTimeout(() => {
      this.props.history.push('/search')
      this.props.loadSearch(params, this.props.history)
    }, 1)
  }
  getTitle () {
    const {gauge} = this.props
    if (gauge.resource !== 'monitor') return null
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {gauge} = this.props
    const {labels, datasets} = this.state
    const chartData = {
      labels,
      datasets: datasets.map((d, i) => ({
        label: d.label,
        data: d.data,
        borderWidth: 2,
        borderColor: appletColors[i],
        fill: false,
        pointRadius: 0,
        pointHitRadius: 20
      }))
    }

    const options = gauge.resource === 'userconnector' ?
      connectorChartOptions :
      {
        ...chartOptions,
        onClick: this.onClickPoint.bind(this)
      }

    return (
      <div className="flex-1" style={{overflow: 'hidden'}}>
        <BarChart chartData={chartData} chartOptions={options} />
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
