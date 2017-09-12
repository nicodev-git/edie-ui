import React from 'react'
import {findIndex} from 'lodash'
import {TextField, Checkbox, RaisedButton} from 'material-ui'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'

import {gaugeTitleStyle1} from 'style/common/materialStyles'

export default class GCommand extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      commandResult: '',
      command: '',
      output: true
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
    this.monitorSocket && this.monitorSocket.close()
  }

  onSocketOpen () {

  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.gauge.deviceId) {
      const {commandResult} = msg.data
      this.setState({
        commandResult
      })
    }
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
  onClickSend () {
    const {command, output} = this.state
    this.sendCommandMessage('RunCommand', {
      command, output
    })
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
  getTitle () {
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {commandResult, command} = this.state
    return (
      <div className="flex-vertical flex-1">
        <div className="padding-sm-bottom">
          <TextField
            name="command" style={{width: '100%', marginTop: -20}} value={command}
            onChange={(e, command) => this.setState({command})}/>
          <div>
            <RaisedButton label="Run" onTouchTap={this.onClickSend.bind(this)}/>&nbsp;
          </div>
        </div>
        <div className="flex-1">
          <textarea value={commandResult} readOnly style={{border: 'none', width: '100%', height: '100%'}}/>
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        titleStyle={gaugeTitleStyle1}
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
