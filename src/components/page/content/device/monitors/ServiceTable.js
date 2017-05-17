import React from 'react'
import {RaisedButton} from 'material-ui'
import InfiniteTable from 'components/shared/InfiniteTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import MonitorSocket from 'util/socket/MonitorSocket'
import StatusImg from './StatusImg'

export default class ServiceTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Name',
      'columnName': 'ServiceName',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Display Name',
      'columnName': 'DisplayName'
    }, {
      'displayName': '    ',
      'columnName': 'Status',
      'cssClassName': 'width-200',
      'customComponent': (props) => {
        const val = props.data
        const label = val === 'Running' ? 'Stop' : 'Start'
        return <RaisedButton label={label} onTouchTap={this.onClickStart.bind(this, props.rowData)} primary={val !== 'Running'}/>
      }
    }]
  }
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
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'service',
      deviceId: this.props.device.id
    })
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
  onClickStart (service) {
    if (service.Status === 'Running') {
      this.sendCommandMessage('StopServiceCommand', {service: service.ServiceName})
    } else {
      this.sendCommandMessage('StartServiceCommand', {service: service.ServiceName})
    }
  }
  renderOptions () {
    return (
      <div className="text-center">
        <div className="inline-block"/>
      </div>
    )
  }
  renderBody () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'ServiceName'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={this.props.services}
      />
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          <div className="flex-vertical" style={{height: '100%'}}>
            <div className="padding-md">
              <StatusImg {...this.props}/>
            </div>
            <div className="flex-1">
              {this.renderBody()}
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
