import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import MonitorStatusView from './display/MonitorStatusView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GMonitor extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    let {gauge, device, devices} = this.props
    if (devices) {
      const devIndex = findIndex(devices, {id: device.id})
      if (devIndex >= 0) device = devices[devIndex]
    }

    const index = findIndex(device.monitors, {uid: gauge.monitorId})
    if (index < 0) return null
    const monitor = device.monitors[index]
    const isUp = monitor.status === 'UP'
    const lastUpdate = isUp ? monitor.lastfalure : monitor.lastsuccess
    return (
      <MonitorStatusView isUp={isUp} lastUpdate={lastUpdate} size={gauge.gaugeSize}/>
    )
  }
  renderBackView (options) {
    return (
      <GEditView
        {...this.props}
        onSubmit={this.onSubmit.bind(this, options)}
        hideDuration
        hideSplit
      />
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
