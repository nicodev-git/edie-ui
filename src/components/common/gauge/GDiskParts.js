import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import NoDataPanel from './NoDataPanel'
import MonitorSocket from 'util/socket/MonitorSocket'
import GEditView from './GEditView'

import {getMonitorResult, getBasicMonitorInfo} from 'shared/Global'
import {showAlert} from 'components/common/Alert'

export default class GDiskParts extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false,
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
    // this.monitorSocket.connect(this.onSocketOpen.bind(this))

    // checkAgentUp(this.getDeviceId(), up => {
    //   this.setState({up, loading: false})
    // })
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

  getDeviceDisk (device) {
    const basicInfo = getBasicMonitorInfo(device)
    const disk = basicInfo ? basicInfo.disk : getMonitorResult(device, 'disk')
    if (disk) return disk

    const basicMonitor = getMonitorResult(device, 'basic')
    if (!basicMonitor || !basicMonitor.Disk) return null
    return basicMonitor.Disk
  }

  /////////////////////////////////////////////////////

  renderFrontView () {
    const device = this.getDevice()
    if (!device) return <div />

    const disk = this.getDeviceDisk(device)
    // const up = this.state.up

    if (disk) {
      // const disk = this.state.disk || []

      return (
        <div className="flex-1 flex-horizontal" style={{overflow: 'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Filesystem</th>
                <th>Size</th>
                <th>Used</th>
                <th>Avail</th>
                <th>Use%</th>
                <th>Mount</th>
              </tr>
            </thead>
            <tbody>
            {
              disk.map(d => d.Drives.map(p => {
                return (
                  <tr key={d.DeviceID + p.Name}>
                    <td>{p.Name}</td>
                    <td>{p.TotalSpace}G</td>
                    <td>{p.TotalSpace - p.FreeSpace}G</td>
                    <td>{p.FreeSpace}G</td>
                    <td>{((p.TotalSpace - p.FreeSpace) * 100 / (p.TotalSpace || 1)).toFixed(1)}%</td>
                    <td>{p.Mount}</td>
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
