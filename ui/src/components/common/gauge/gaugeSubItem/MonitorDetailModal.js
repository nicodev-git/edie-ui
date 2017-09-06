import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showMonitorDetailModal(false)
  }
  render () {
    return (
      <MonitorDetailModalView
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
