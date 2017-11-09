import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import Speedometer from './display/Speedometer'
import NoDataPanel from './NoDataPanel'
import MonitorSocket from 'util/socket/MonitorSocket'
import GEditView from './GEditView'

import {checkAgentUp} from 'shared/Global'
import {showAlert} from 'components/common/Alert'
import {bytesToSize} from 'util/Formatter'

export default class GDeviceIO extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      network: null,
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
      disk: null,
      network:null,
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
      monitors: 'network,disk',
      deviceId: this.getDeviceId()
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.getDeviceId()) {
      const {network, disk} = msg.data
      const state = {}
      if (network) state.network = network
      if (disk) state.disk = disk
      state.up = true
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

  sumNetworks (networks) {
    let sent = 0
    let received = 0

    if (networks) {
      networks.forEach(p => {
        sent += p.BytesSentPerSec
        received += p.BytesReceivedPerSec
      })
    }


    return {
      sent,
      received,
      sum: sent + received
    }
  }

  sumDisks (disks) {
    let read = 0
    let write = 0

    if (disks) {
      disks.forEach(p => {
        read += p.DiskReadBytesPerSec
        write += p.DiskWriteBytesPerSec
      })
    }


    return {
      read,
      write,
      sum: read + write
    }
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

    const up = this.state.up

    if (up) {
      const {network, disk} = this.state
      const networkValue = this.sumNetworks(network)
      const diskValue = this.sumDisks(disk)

      const items = [{
        title1: `${bytesToSize(networkValue.sent)} / ${bytesToSize(networkValue.received)}`,
        title2: 'Sent / Received',
        title3: 'Network IO',
        value: 0
      }, {
        title1: `${bytesToSize(diskValue.read)} / ${bytesToSize(diskValue.write)}`,
        title2: 'Read / Write',
        title3: 'Disk IO',
        value: 0
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

        title={this.getTitle()}
        bodyStyle={{padding: "0px 20px 20px"}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
