import React from 'react'
import CpuProcessModalView from './CpuProcessModalView'

import InfiniteTable from 'components/common/InfiniteTable'
import MonitorSocket from 'util/socket/MonitorSocket'

export default class CpuProcessModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      monitors: 'process',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
    }
  }

  onClickClose () {
    this.props.showDeviceCpuProcessModal(false)
  }
  renderTable () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'Id'}}
        selectable
        rowHeight={40}
        bodyHeight={300}
        useExternal={false}
        data={this.props.processes}
      />
    )
  }
  render () {
    return (
      <CpuProcessModalView
        onHide={this.onClickClose.bind(this)}
        table={this.renderTable()}
      />
    )
  }
}
