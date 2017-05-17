import React from 'react'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import MonitorSocket from 'util/socket/MonitorSocket'

import StatusImg from './StatusImg'

export default class NetworkTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Name'
    }, {
      'displayName': 'Source',
      'columnName': 'LocalIP',
      'customComponent': p => {
        const data = p.rowData
        return <span>{data.Direction === 'In' ? data.RemoteIP : data.LocalIP}</span>
      }
    }, {
      'displayName': 'Destination',
      'columnName': 'RemoteIP',
      'customComponent': p => {
        const data = p.rowData
        return <span>{data.Direction === 'In' ? data.LocalIP : data.RemoteIP}</span>
      }
    }, {
      'displayName': 'Service',
      'columnName': 'RemotePort',
      'customComponent': p => {
        const data = p.rowData
        return <span>{data.Direction === 'In' ? data.LocalPort : data.RemotePort} / {data.Protocol}</span>
      }
    }, {
      'displayName': 'Action',
      'columnName': 'Action'
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
      monitors: 'network',
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
      <div style={{height: '100%', overflow: 'auto'}}>
        <table className="table table-hover">
          <thead>
          <tr><th>Name</th></tr>
          </thead>
          <tbody>
          {this.props.monitorNetworks.map((m, i) =>
            <tr key={i}><td>{m.Name}</td></tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name} titleOptions={<StatusImg {...this.props}/>}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
