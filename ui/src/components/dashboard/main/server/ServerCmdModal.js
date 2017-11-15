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
      loading: false
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

    if (!this.state.connected) {
      this.connect()

      this.setState({
        connected: true
      })
    }
  }
  connect () {
    this.props.forEach(device => {
      const socket = new MonitorSocket({
        listener: this.onMonitorMessage.bind(this)
      })
      socket.device = device
      socket.connect(this.onSocketOpen.bind(this))

      this.sockets.push(socket)
    })
  }

  componentWillUnmount () {
    this.sockets.forEach(socket => {
      socket.close()
    })

  }

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
