import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {keys} from 'lodash'
import axios from 'axios'

import MonitorSocket from 'util/socket/MonitorSocket'
import ServerCmdModalView from './ServerCmdModalView'

class ServerCmdModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      connected: false,
      cmd: '',
      loading: false,
      results: {}
    }

    this.sockets = []
  }
  componentWillMount () {
    axios.get(`${ROOT_URL}/findBasicInfo`, {
      params: {
        deviceIds: this.props.devices.map(p => p.id).join(',')
      }
    }).then(res => {
      this.setState({
        devices: res.data.map(p => {
          const data = {
            id: p.device.id,
            name: p.device.name,
            os: 'Windows',
            ip: p.device.wanip || p.device.lanip
          }

          if (p.data) {
            data.os = p.data.OS.Name
          }

          return data
        })
      })
    })
  }
  onSubmit (values) {
    const {cmd} = values
    if (!cmd) return
    this.setState({
      cmd,
      loading: true
    })

    this.setState({
      results: {}
    })
    if (!this.state.connected) {
      this.connect()

      this.setState({
        connected: true
      })
    } else {
      this.sockets.forEach(socket => {
        this.sendCommandMessage(socket, cmd)
      })
    }
    this.startLoadTimer()
  }
  connect () {
    this.props.devices.forEach(device => {
      const socket = new MonitorSocket({
        listener: this.onMonitorMessage.bind(this)
      })
      socket.device = device
      socket.connect(this.onSocketOpen.bind(this, socket))

      this.sockets.push(socket)
    })
  }

  componentWillUnmount () {
    this.stopLoadTimer()
    this.sockets.forEach(socket => {
      socket.close()
    })
  }

  //////////////////////////////////////////////////////////////////

  onSocketOpen (socket) {
    this.sendCommandMessage(socket, this.state.cmd)
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update') {
      const {commandResult} = msg.data

      const results = {
        ...this.state.results,
        [msg.deviceId]: commandResult
      }
      this.setState({results})

      if (keys(results).length === this.props.devices.length) {
        this.stopLoadTimer()
        this.setState({
          loading: false
        })
      }
    }
  }
  sendCommandMessage (socket, command) {
    socket.send({
      action: 'command',
      deviceId: socket.device.id,
      data: {
        name: 'RunCommand',
        params: {
          output: true,
          command
        }
      }
    })
  }
  //////////////////////////////////////////////////////////////////

  startLoadTimer () {
    this.loadTimer = setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 5000)
  }

  stopLoadTimer () {
    clearTimeout(this.loadTimer)
  }

  //////////////////////////////////////////////////////////////////

  render () {
    const {loading, results} = this.state
    const {onHide, handleSubmit, devices} = this.props
    return (
      <ServerCmdModalView
        onHide={onHide}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        loading={loading}
        results={results}
        devices={devices}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'serverCmdForm'})(ServerCmdModal))
