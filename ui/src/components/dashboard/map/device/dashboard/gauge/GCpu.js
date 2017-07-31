import React from 'react'

import FlipView from './FlipView'
import DoneButton from './DoneButton'
import LiquidView from './display/LiquidView'

import MonitorSocket from 'util/socket/MonitorSocket'

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

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  renderFrontView () {
    const {gauge} = this.props
    const {cpu} = this.state
    const value = cpu ? (cpu.length ? cpu[0].Usage : cpu.Usage) : 0
    return (
      <div className="flex-1">
        <LiquidView title={gauge.name} value={value}/>
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

        onClickDelete={this.onClickDelete.bind(this)}
        viewOnly
      />
    )
  }
}
