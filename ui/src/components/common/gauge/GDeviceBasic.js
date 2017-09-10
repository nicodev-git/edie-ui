import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import AccelView from './display/AccelMeterView'

import MonitorSocket from 'util/socket/MonitorSocket'

export default class GDeviceBasic extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      memory: null,
      cpu: null,
      disk: null
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
      const {cpu, memory, disk} = msg.data
      const state = {}
      if (cpu) state.cpu = cpu
      if (memory) state.memory = memory
      if (disk) state.disk = disk && disk.length && disk[0].Drives ? disk[0].Drives[0] : null
      state.loading = false

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
        <label className="col-md-9" style={{...style, borderLeft: '1px solid #777'}}>{text}&nbsp;&nbsp;</label>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()
    if (!device) return <div />

    const {cpu, memory, disk} = this.state

    const cpuValue = cpu ? (cpu.length ? cpu[0].Usage : cpu.Usage) : 0
    const memValue = memory ?  Math.ceil(memory.UsedSize * 100 / memory.TotalSize) : 0
    const diskValue = disk ? Math.ceil(disk.FreeSpace * 100 / disk.TotalSpace) : 0

    return (
      <div style={{marginTop: 26}}>
        <AccelView title="CPU" value={cpuValue}/>
        <AccelView title="Memory" value={memValue}/>
        <AccelView title="Disk" value={diskValue}/>
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
        hideTitle

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
