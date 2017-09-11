import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import Speedometer from './display/Speedometer'

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

  renderItem (item) {
    return (
      <div className="flex-1" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <Speedometer {...item}/>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()
    const {cpu, memory, disk, loading} = this.state
    if (loading) return <div />

    const cpuValue = cpu ? (cpu.length ? cpu[0].Usage : cpu.Usage) : 0
    const memValue = memory ?  Math.ceil(memory.UsedSize * 100 / memory.TotalSize) : 0
    const diskValue = disk ? Math.ceil(disk.FreeSpace * 100 / disk.TotalSpace) : 0

    const items = [{
      title1: `${memValue}%`,
      title2: 'Memory Utilization',
      value: memValue
    }, {
      title1: `${diskValue}%`,
      title2: 'Disk Utilization',
      value: diskValue
    }, {
      title1: `${cpuValue}%`,
      title2: 'CPU Utilization',
      value: cpuValue
    }]

    return (
      <div className="flex-1 flex-horizontal" style={{marginTop: 16}}>
        {items.map(item => this.renderItem(item))}
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
