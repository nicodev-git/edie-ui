import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import Speedometer from './display/Speedometer'
import NoDataPanel from './NoDataPanel'
import MonitorSocket from 'util/socket/MonitorSocket'
import GEditView from './GEditView'

import {checkAgentUp, sumDisks, getBasicMonitorInfo, getMonitorResult} from 'shared/Global'
import {showAlert} from 'components/common/Alert'

export default class GDeviceBasic extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      memory: null,
      cpu: null,
      disk: null,
      up: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
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
      loading: true,
      memory: null,
      cpu: null,
      disk: null,
      up: false
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))

    checkAgentUp(this.getDeviceId(), up => {
      this.setState({up, loading: false})
    })
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }
  ///////////////////////////////////////////////////////////////////

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
      if (disk) state.disk = sumDisks(disk)
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
  getTitle () {
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }

  /////////////////////////////////////////////////////

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

    const up = true//this.state.up

    if (up) {

      const basicInfo = getBasicMonitorInfo(device)
      const cpu = basicInfo ? basicInfo.CPU : getMonitorResult(device, 'cpu')
      const memory = basicInfo ? basicInfo.Memory : getMonitorResult(device, 'memory')
      let disk = basicInfo ? basicInfo : getMonitorResult(device, 'disk')
      disk = disk ? sumDisks(disk) : null

      const cpuValue = cpu ? parseFloat(cpu.Usage.replace('%', '')) : 0
      const memValue = memory ?  Math.ceil(memory.UsedSize * 100 / memory.TotalSize) : 0
      const diskValue = disk ? Math.ceil(disk.UsedSpace * 100 / disk.TotalSpace) : 0

      const items = [{
        title1: `${cpuValue}%`,
        title2: cpu ? cpu.Model : '',
        title3: 'CPU Utilization',
        value: cpuValue
      }, {
        title1: `${memValue}%`,
        title2: memory ? `${(memory.UsedSize / 1024).toFixed(1)}G / ${(memory.TotalSize / 1024).toFixed(1)}G` : '',
        title3: 'Memory Utilization',
        value: memValue
      }, {
        title1: `${diskValue}%`,
        title2: disk ? `${disk.UsedSpace}G / ${disk.TotalSpace}G` : '',
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

  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
        />
      </div>
    )
  }

  render () {
    return (
      <FlipView
        {...this.props}

        title="[CPU/Memory/Disk]"
        bodyStyle={{padding: "0px 20px 20px"}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
