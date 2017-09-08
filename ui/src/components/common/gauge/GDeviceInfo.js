import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'

import MonitorSocket from 'util/socket/MonitorSocket'

export default class GDeviceInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false,
      memory: null,
      cpu: null,
      disk: null,
      os: null
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentDidMount () {
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  componentWillUnmount () {
    this.monitorSocket && this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'basic',
      deviceId: this.getDeviceId()
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.getDeviceId()) {
      const {cpu, memory, disk, os} = msg.data
      this.setState({
        cpu,
        memory,
        disk: disk && disk.length && disk[0].Drives ? disk[0].Drives[0] : null,
        os
      })
    }
  }

  ////////////////////////////////////////////////////
  getDeviceId () {
    return this.props.gauge.deviceId
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  renderRow (label, text) {
    return (
      <div className="row">
        <label className="col-md-4 text-right">{label}:</label>
        <label className="col-md-8">{text}</label>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()
    if (!device) return <div />

    const {cpu, memory, disk, os} = this.state

    const cpuValue = cpu ? `${cpu.length ? cpu[0].Usage : cpu.Usage}%` : ''
    const memValue = memory ? `${memory.UsedSize}M / ${memory.TotalSize}M` : ''
    const diskValue = disk ? `${disk.FreeSpace}G / ${disk.TotalSpace}G` : ''

    const sysDesc = os ? os.Name : ''

    return (
      <div>
        {this.renderRow('Status', device.agent ? 'UP' : 'DOWN')}
        {this.renderRow('IPAddress', device.wanip || device.lanip)}
        {this.renderRow('DNS Name', device.hostname)}
        {this.renderRow('System', sysDesc)}

        {this.renderRow('CPU', cpuValue)}
        {this.renderRow('RAM', memValue)}
        {this.renderRow('Disk', diskValue)}
      </div>
    )
  }

  renderBackView () {
    return null
  }

  render () {
    return (
      <FlipView
        {...this.props}
        hideHeader

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
