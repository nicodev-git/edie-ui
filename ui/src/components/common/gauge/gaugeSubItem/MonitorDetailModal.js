import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

const templateMap = {
  'cpu': 'CPU '
}

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showMonitorDetailModal(false)
  }
  renderGauge () {
    const {gaugeMonitor, gaugeDevice} = this.props
    const {monitortype} = gaugeMonitor
    if (['cpu', 'disk', 'memory'].includes(monitortype)) {
      const gauge = {
        "name" : "",
        "templateName" : "Memory",
        "deviceId" : gaugeDevice.id,
      }
    } else {

    }
  }
  render () {
    const {gaugeMonitor} = this.props
    return (
      <MonitorDetailModalView
        title={gaugeMonitor.name}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
