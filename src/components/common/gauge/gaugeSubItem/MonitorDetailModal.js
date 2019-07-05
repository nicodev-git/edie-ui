import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

const templateMap = {
  'cpu': 'Cpu',
  'memory': 'Memory',
  'disk': 'Disk',
  'ping': 'Up/Down'
}

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showMonitorDetailModal(false)
  }
  getGagueItem () {
    const {gaugeMonitor, gaugeDevice} = this.props
    const {monitortype} = gaugeMonitor
    if (['cpu', 'disk', 'memory'].includes(monitortype)) {
      return {
        name : '',
        templateName: templateMap[monitortype],
        deviceId : gaugeDevice.id,
        timing: 'realtime',
        gaugeType: monitortype === 'memory' ? 'liquid' : 'accel'
      }
    } else {
      return {
        name : '',
        templateName: 'Up/Down',
        deviceId : gaugeDevice.id,
        monitorId: gaugeMonitor.uid
      }
    }
  }
  render () {
    const {gaugeMonitor, gaugeDevice} = this.props
    const gauge = this.getGagueItem()
    return (
      <MonitorDetailModalView
        {...this.props}
        title={`${gaugeMonitor.name} - ${gaugeDevice.name}`}
        onHide={this.onHide.bind(this)}
        gauge={gauge}
      />
    )
  }
}
