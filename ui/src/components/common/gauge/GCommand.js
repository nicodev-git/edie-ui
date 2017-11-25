import React from 'react'
// import {findIndex} from 'lodash'
import {TextField, RaisedButton} from 'material-ui'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'

export default class GCommand extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      commandResult: '',
      command: '',
      output: true,
      loading: false
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
    this.stopCommandTimer()
    this.monitorSocket && this.monitorSocket.close()
  }

  ////////////////////////////////////////////////

  onSocketOpen () {

  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.gauge.deviceId) {
      const {commandResult} = msg.data
      this.setState({
        commandResult,
        loading: false
      })
      this.stopCommandTimer()
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

  startCommandTimer () {
    this.stopCommandTimer()
    this.commandTimer = setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 15000)
  }

  stopCommandTimer () {
    this.commandTimer && clearTimeout(this.commandTimer)
    this.commandTimer = 0
  }

  onClickSend () {
    const {command, output} = this.state
    if (!command) return
    this.sendCommandMessage('RunCommand', {
      command, output
    })

    this.setState({
      loading: true
    })

    this.startCommandTimer()
  }

  onKeyDownInput (e) {
    if (e.keyCode === 13) {
      this.onClickSend()
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
  getTitle () {
    return "[CMD]"
    // const {gauge} = this.props
    // const devices = this.props.allDevices || this.props.devices
    // const index = findIndex(devices, {id: gauge.deviceId})
    // if (index < 0) return gauge.name
    // return `[${devices[index].name}] ${gauge.name}`
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {commandResult, command} = this.state
    return (
      <div className="flex-vertical flex-1">
        <div className="flex-1">
          <textarea
            value={commandResult} readOnly
            style={{border: 'none', width: '100%', height: '100%', background: 'black', color: '#00FF00'}}/>
        </div>
        <div className="flex-horizontal">
          <div className="flex-1">
            <TextField
              name="command" style={{width: '100%'}} value={command}
              onChange={(e, command) => this.setState({command})}
              onKeyDown={this.onKeyDownInput.bind(this)}
              autoFocus
            />
          </div>
          <div className="padding-md-left" style={{marginTop: 7}}>
            <RaisedButton label="Run" onTouchTap={this.onClickSend.bind(this)}/>
          </div>
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

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}
        bodyStyle={{padding: '2px 12px'}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
