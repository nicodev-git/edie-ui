import React from 'react'
import moment from 'moment'
import axios from 'axios'

import FlipView from './FlipView'
import LiquidView from './display/LiquidView'
import AccelView from './display/AccelMeterView'
import GEditView from './GEditView'
import LineChart from './display/LineChart'

import MonitorSocket from 'util/socket/MonitorSocket'

import {showAlert} from 'components/common/Alert'

export default class GCpu extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false,
      cpu: null
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentDidMount () {
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  componentWillUnmount () {
    this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'basic',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {cpu} = msg.data
      if (cpu) this.setState({ cpu })
    }
  }

  fetchRecordCount (props) {
    const {gauge, searchList, device} = props
    const {savedSearchId, monitorId, resource, duration, durationUnit, splitUnit} = gauge

    this.setState({
      loading: true
    })

    let inc = 1
    if (durationUnit === 'month' && splitUnit === 'day') inc = 0
    const dateFrom = moment().add(-duration + inc, `${durationUnit}s`)
      .startOf(durationUnit === 'hour' || duration === 1 ? durationUnit : 'day')
    const dateTo = moment().endOf(durationUnit === 'hour' ? durationUnit : 'day')
    const ROOT_URL = ''
    if (resource === 'monitor') {
      axios.get(`${ROOT_URL}/event/search/findByDate`, {
        params: {
          dateFrom: dateFrom.valueOf(),
          dateTo: dateTo.valueOf(),
          monitorId,
          sort: 'timestamp'
        }
      }).then(res => {
        this.setState({
          searchRecordCounts: res.data._embedded.events.map(p => ({
            date: moment(p.timestamp).format('YYYY-MM-DD HH:mm:ss'),
            count: p.eventType === 'AGENT' || (p.lastResult && p.lastResult.status === 'UP') ? 1 : 0
          })),
          loading: false
        })
      })
    }
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
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
  renderFrontView () {
    const {gauge} = this.props
    if (gauge.timing === 'historic') {

    } else {
      const {cpu} = this.state
      const value = cpu ? (cpu.length ? cpu[0].Usage : cpu.Usage) : 0
      return (
        <div className="flex-vertical flex-1">
          <div className="flex-1">
            {gauge.gaugeType === 'accel' ? (
              <AccelView value={value}/>
            ) : (
              <LiquidView value={value}/>
            )}
          </div>
          <div className="text-center">{gauge.name}</div>
        </div>
      )
    }
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
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
        viewOnly={!this.props.devices}
      />
    )
  }
}
