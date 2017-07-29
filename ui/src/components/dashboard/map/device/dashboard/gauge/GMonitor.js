import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import DoneButton from './DoneButton'
import MonitorStatusView from './display/MonitorStatusView'

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

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
