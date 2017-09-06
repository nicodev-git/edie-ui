import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

const templateMap = {
  'cpu': 'Cpu',
  'memory': 'Memory',
  'disk': 'Disk'
}

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showMonitorDetailModal(false)
  }
  getGagueItem () {
    const {gaugeMonitor, gaugeDevice} = this.props
    const {monitortype} = gaugeMonitor
    if (['cpu', 'disk', 'memory'].includes(monitortype)) {
      const gauge = {
        name : '',
        templateName: templateMap[monitortype],
        deviceId : gaugeDevice.id,
        timing: 'realtime',
        gaugeType: monitortype === 'memory' ? 'liquid' : 'accel'
      }
      return gauge
    } else {

    }
  }
  render () {
    const {gaugeMonitor, gaugeDevice} = this.props
    return (
      <MonitorDetailModalView
        title={`${gaugeMonitor.name} - ${gaugeDevice.name}`}
        onHide={this.onHide.bind(this)}
        gauge={this.getGagueItem()}
      />
    )
  }
}
