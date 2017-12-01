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

export default class GDiskParts extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
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
      monitors: 'disk',
      deviceId: this.getDeviceId()
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.getDeviceId()) {
      const {disk} = msg.data
      const state = {}
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

  sumDisks (disks) {
    let read = 0
    let write = 0

    if (disks) {
      disks.forEach(p => {
        read += p.DiskReadBytesPerSec
        write += p.DiskWriteBytesPerSec
      })
    }

    const speed = 500

    const util = Math.min(Math.round(Math.max(read, write) / 1024 / 1024 * 100 / speed), 100)

    return {
      read,
      write,
      util,
      sum: read + write
    }
  }

  /////////////////////////////////////////////////////

  renderFrontView () {
    const device = this.getDevice()


    if (!device) return <div />

    const up = this.state.up

    if (up) {
      const {disk} = this.state

      return (
        <div className="flex-1 flex-horizontal" style={{marginTop: 8, overflow: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Filesystem</th>
                <th>Size</th>
                <th>Used</th>
                <th>Avail</th>
                <th>Use%</th>
              </tr>
            </thead>
            <tbody>
            {
              disk.map(d => d.Drives.map(p => {
                return (
                  <tr key={d.DeviceID + p.Name}>
                    <td>{p.Name}</td>
                    <td>{p.TotalSpace}</td>
                    <td>{p.TotalSpace - p.FreeSpace}</td>
                    <td>{p.FreeSpace}</td>
                    <td></td>
                  </tr>
                )
              }))
            }
            </tbody>
          </table>
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

        title="[Disk]"
        bodyStyle={{padding: "0px 20px 20px"}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
