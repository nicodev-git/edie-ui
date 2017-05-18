import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'


import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import MonitorSocket from 'util/socket/MonitorSocket'

@connect(
  state => ({initialValues: {output: true}})
)
@reduxForm({form: 'tabCommandForm'})
export default class CommandTable extends React.Component {
  componentWillMount () {
    this.props.clearMonitors()
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
    // this.monitorSocket.send({
    //   action: 'enable-realtime',
    //   monitors: 'service',
    //   deviceId: this.props.device.id
    // })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
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
  onSubmit (values) {
    console.log(values)
    // this.props.clearExecData()
    // this.sendCommandMessage('RunCommand', values)
  }
  renderOptions () {
    return (
      <div className="text-center">
        <div className="inline-block"/>
      </div>
    )
  }
  renderBody () {
    const {handleSubmit, monitorCommandResult} = this.props
    return (
      <div className="flex-vertical" style={{height: '100%'}}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="padding-md">
            <Field name="command" component={FormInput} floatingLabel="Command"/>&nbsp;
            <div className="inline-block valign-bottom">
              <Field name="output" component={FormCheckBox} label="Output"/>
            </div>
            <div>
              <RaisedButton label="Run" type="submit"/>&nbsp;
            </div>
          </div>
        </form>
        <div className="flex-1">
          <textarea value={monitorCommandResult} readOnly style={{border: 'none', width: '100%', height: '100%'}}/>
        </div>
      </div>
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Command">
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
