import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'
import {getMonitorResult, getBasicMonitorInfo} from 'shared/Global'

const cellStyle = {
  height: 250,
  width: '50%',
  display: 'inline-block',
  position: 'relative',
  border: '1px solid lightgray',
  overflow: 'auto',
  padding: 4
}

export default class GFirewall extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      rules: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

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

  componentDidMount () {
    this.startUpdate()
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevProps.gauge) !== JSON.stringify(this.props.gauge)) {
      this.stopUpdate()
      setTimeout(() => {
        this.startUpdate()
      }, 10)
    }
  }

  componentWillUnmount () {
    this.stopUpdate()
  }

  startUpdate () {
    this.setState({
      rules: []
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'firewall',
      deviceId: this.props.device.id
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {firewallRules} = msg.data
      if (!firewallRules) return
      this.setState({
        rules: firewallRules.map((u, i) => ({...u, id: i}))
      })
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
  onToggleStatus (e, checked) {
    this.sendCommandMessage('SetFirewallStatusCommand', {
      status: checked ? 'on' : 'off'
    })
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
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }

  getDeviceId () {
    return this.props.gauge.deviceId
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderTable (data) {
    const firewalls = data.Items.map((p, i) => ({
      ...p,
      id: i
    }))
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={firewalls}
      />
    )
  }

  renderFrontView () {
    const device = this.getDevice()
    const basicMonitor = getBasicMonitorInfo(device)
    const firewalls = getMonitorResult(device, 'firewall') || (basicMonitor ? basicMonitor.firewall : null) || []

    return (
      <div style={{height: '100%', overflow: 'auto'}}>
        {firewalls.map((f, i) =>
          <div key={i} style={cellStyle}>
            <div className="flex-vertical" style={{height: '100%'}}>
              <div>{f.Type} / {f.Chain}</div>
              <div className="flex-1">
                {this.renderTable(f)}
              </div>
            </div>
          </div>
        )}

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

        titleStyle={gaugeTitleStyle1}
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
