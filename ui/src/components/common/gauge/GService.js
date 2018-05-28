import React from 'react'
import {findIndex} from 'lodash'
import {Button} from '@material-ui/core'

import FlipView from './FlipView'
import GEditView from './GEditView'
import MonitorStatusView from './display/MonitorStatusView'

import MonitorSocket from 'util/socket/MonitorSocket'
import {showAlert} from 'components/common/Alert'

export default class GService extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      isUp: false,
      services: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentDidMount () {
    this.startUpdate()
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevProps.gauge) !== JSON.stringify(this.props.gauge)) {
      this.stopUpdate()
      setTimeout(() => {
        this.startUpdate()
      }, 10)
    }
  }

  componentWillUnmount () {
    this.stopUpdate()
  }

  startUpdate () {
    this.setState({
      loading: true,
      isUp: false,
      services: []
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }

  sendCommandMessage (name, params) {
    this.monitorSocket.send({
      action: 'command',
      deviceId: this.props.device.id,
      data: {
        name,
        params
      }
    })
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'service',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {service} = msg.data
      const index = findIndex(service, {ServiceName: this.props.gauge.serviceName})
      if (index >= 0) {
        this.setState({isUp: service[index].Status === 'Running'})
      }
      this.setState({
        services: service,
        loading: false
      })
    }
  }

  onClickToggle () {
    const {isUp} = this.state
    if (isUp) {
      this.sendCommandMessage('StopServiceCommand', {service: this.props.gauge.serviceName})
    } else {
      this.sendCommandMessage('StartServiceCommand', {service: this.props.gauge.serviceName})
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
    const {isUp} = this.state
    return (
      <div>
        <MonitorStatusView isUp={isUp} hideLabel size={gauge.gaugeSize}/>
        <div style={{position: 'absolute', bottom: 15, width: '100%'}} className="text-center">
          <Button variant="raised" onClick={this.onClickToggle.bind(this)}>{isUp ? 'Stop' : 'Start'}</Button>
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          services={this.state.services}
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

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
