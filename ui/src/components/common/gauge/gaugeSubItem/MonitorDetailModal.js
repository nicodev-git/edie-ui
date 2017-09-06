import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showMonitorDetailModal(false)
  }
  renderGauge () {
    const {gaugeMonitor} = this.props
    const {monitortype} = gaugeMonitor
    if (['cpu', 'disk', 'memory'].includes(monitortype)) {

    } else {

    }
  }
  render () {
    return (
      <MonitorDetailModalView
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
