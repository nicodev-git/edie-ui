import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import MonitorSocket from 'util/socket/MonitorSocket'

import ServerCmdModalView from './ServerCmdModalView'

class ServerCmdModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      connected: false,
      cmd: '',
      loading: false,
      results: []
    }

    this.sockets = []
  }
  onSubmit (values) {
    const {cmd} = values
    if (!cmd) return
    this.setState({
      cmd,
      loading: true
    })

    this.setState({
      results: []
    })
    if (!this.state.connected) {
      this.connect()

      this.setState({
        connected: true
      })
    } else {
      this.sockets.forEach(socket => {
        this.sendCommandMessage(socket)
      })
    }
    this.startLoadTimer()
  }
  connect () {
    this.props.devices.forEach(device => {
      const socket = new MonitorSocket({
        listener: this.onMonitorMessage.bind(this, socket)
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
  onMonitorMessage (socket, msg) {
    if (msg.action === 'update') {
      const {commandResult} = msg.data
      this.setState({
        results: [...this.state.results, {
          device: socket.device,
          output: commandResult
        }]
      })
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

    }, 15000)
  }

  stopLoadTimer () {
    clearTimeout(this.loadTimer)
  }

  //////////////////////////////////////////////////////////////////

  render () {
    const {onHide, handleSubmit} = this.props
    return (
      <ServerCmdModalView
        onHide={onHide}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'serverCmdForm'})(ServerCmdModal))
