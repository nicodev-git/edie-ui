import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import MonitorSocket from 'util/socket/MonitorSocket'

import ServerCmdModalView from './ServerCmdModalView'

class ServerCmdModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  onSubmit (values) {
    const {cmd} = values
    if (!cmd) return
    console.log(values)
  }
  connect () {
    this.props.forEach(device => {
      this.monitorSocket = new MonitorSocket({
        listener: this.onMonitorMessage.bind(this)
      })
      this.monitorSocket.connect(this.onSocketOpen.bind(this))
    })

  }

  disconnect () {

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
