import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import Speedometer from './display/Speedometer'
import NoDataPanel from './NoDataPanel'
import MonitorSocket from 'util/socket/MonitorSocket'

export default class GDeviceBasic extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false,
      memory: null,
      cpu: null,
      disk: null,
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
      state.up = true

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

  renderItem (item, i) {
    return (
      <div key={i} className="flex-1" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <Speedometer {...item}/>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()


    if (!device) return <div />

    const up = this.state.up || (device.agent && (new Date().getTime() - device.agent.lastSeen) < 3 * 60 * 1000)

    if (up) {
      const {cpu, memory, disk} = this.state
      const cpuValue = cpu ? (cpu.length ? cpu[0].Usage : cpu.Usage) : 0
      const memValue = memory ?  Math.ceil(memory.UsedSize * 100 / memory.TotalSize) : 0
      const diskValue = disk ? Math.ceil(disk.FreeSpace * 100 / disk.TotalSpace) : 0

      const items = [{
        title1: `${cpuValue}%`,
        title2: cpu ? `${cpu.length ? cpu[0].Model : cpu.Model}` : '',
        title3: 'CPU Utilization',
        value: cpuValue
      }, {
        title1: `${memValue}%`,
        title2: memory ? `${memory.UsedSize}M / ${memory.TotalSize}M` : '',
        title3: 'Memory Utilization',
        value: memValue
      }, {
        title1: `${diskValue}%`,
        title2: disk ? `${disk.FreeSpace}G / ${disk.TotalSpace}G` : '',
        title3: 'Disk Utilization',
        value: diskValue
      }]

      return (
        <div className="flex-1 flex-horizontal" style={{marginTop: 8}}>
          {items.map(this.renderItem.bind(this))}
        </div>
      )
    } else {
      return (
        <NoDataPanel />
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
