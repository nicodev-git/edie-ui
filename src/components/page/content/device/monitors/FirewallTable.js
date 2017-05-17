import React from 'react'
import InfiniteTable from 'components/shared/InfiniteTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import MonitorSocket from 'util/socket/MonitorSocket'

import StatusImg from './StatusImg'

export default class FirewallTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Filename',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Id',
      'columnName': 'Id',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'Owner',
      'columnName': 'Owner',
      'cssClassName': 'width-220'
    }, {
      'displayName': 'Parent',
      'columnName': 'Parent',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Location',
      'columnName': 'Location'
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
      monitors: 'firewall',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
    }
  }

  onRowDblClick () {
    const selected = this.refs.table.getSelected()
    this.props.openProcessModal(selected)
  }
  onChangeQuery (e) {
    this.setState({
      query: e.target.value
    })
  }
  onKeyupQuery (e) {
    if (e.keyCode === 13) {
      this.onClickSearch()
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
        rowMetadata={{'key': 'id'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={this.props.monitorFwRules}
      />
    )
  }
  render () {
    const {device, monitorsUpdateTime, monitorFwStatus} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          <div className="flex-vertical" style={{height: '100%'}}>
            <div className="padding-md">
              <StatusImg {...this.props}/>
              {monitorsUpdateTime > 0 && <span>Firewall: {monitorFwStatus ? 'ON' : 'OFF'}</span>}
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
