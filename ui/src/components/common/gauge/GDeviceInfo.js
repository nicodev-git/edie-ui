import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import NoDataPanel from './NoDataPanel'
import MonitorSocket from 'util/socket/MonitorSocket'

import {checkAgentUp} from 'shared/Global'

export default class GDeviceInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      memory: null,
      cpu: null,
      disk: null,
      os: null,
      hostname: '',
      lastRequest: new Date().getTime(),
      up: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentDidMount () {
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
    checkAgentUp(this.getDeviceId(), up => {
      this.setState({up, loading: false})
    })
  }

  componentWillUnmount () {
    this.monitorSocket && this.monitorSocket.close()
  }

  sendHostNameCmd () {
    this.monitorSocket.send({
      action: 'command',
      deviceId: this.getDeviceId(),
      data: {
        name: 'RunCommand',
        params: {
          output: true,
          command: 'hostname'
        }
      }
    })
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'basic',
      deviceId: this.getDeviceId()
    })

    this.sendHostNameCmd()
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.getDeviceId()) {
      const {cpu, memory, disk, os, commandResult} = msg.data
      const state = {}
      if (cpu) state.cpu = cpu
      if (memory) state.memory = memory
      if (disk) state.disk = disk && disk.length && disk[0].Drives ? disk[0].Drives[0] : null
      if (os) state.os = os
      if (commandResult && !this.state.hostname) state.hostname = commandResult

      state.loading = false

      if (!this.state.up) {
        this.sendHostNameCmd()
      }

      this.setState(state)
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

  renderRow (label, text, style) {
    return (
      <div className="row">
        <label className="col-md-3 text-right">{label}:</label>
        <label className="col-md-9" style={{...style, borderLeft: '1px solid #777'}}>
          {text ? (
            <span>{text}&nbsp;&nbsp;</span>
          ) : (
            <div style={{height: 16, background: 'gray', width: '90%'}}>&nbsp;</div>
          )}
        </label>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()
    if (!device) return <div />

    const {cpu, memory, disk, os, hostname} = this.state

    const up = this.state.up

    if (up) {
      const cpuValue = cpu ? `${cpu.length ? cpu[0].Usage : cpu.Usage}%` : ''
      const memValue = memory ? `${memory.UsedSize}M / ${memory.TotalSize}M` : ''
      const diskValue = disk ? `${disk.FreeSpace}G / ${disk.TotalSpace}G` : ''

      const hardware = cpu ? `Hardware: ${cpu.Model} ` : ''
      const software = os ? `Software: ${os.Name} ` : ''
      const sysDesc = `${hardware}${software}`

      return (
        <div style={{marginTop: 26}}>
          {this.renderRow('Status', up ? 'UP' : 'DOWN')}
          {this.renderRow('IPAddress', device.wanip || device.lanip)}
          {this.renderRow('DNS Name', hostname)}
          {this.renderRow('System', sysDesc, {height: '4em'})}

          {this.renderRow('CPU', cpuValue)}
          {this.renderRow('RAM', memValue)}
          {this.renderRow('Disk', diskValue)}
        </div>
      )
    } else {
      return (
        <NoDataPanel/>
      )
    }
  }

  renderBackView () {
    return null
  }

  render () {
    return (
      <FlipView
        {...this.props}
        hideTitle

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
