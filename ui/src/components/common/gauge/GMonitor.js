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
    const {gauge, device} = this.props

    const index = findIndex(device.monitors, {uid: gauge.monitorId})
    if (index < 0) return null
    return (
      <MonitorStatusView monitor={device.monitors[index]}/>
    )
  }
  renderBackView (options) {
    return (
      <GEditView
        searchList={this.props.searchList}
        gauge={this.props.gauge}
        monitors={this.props.monitors}
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
