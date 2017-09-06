import React from 'react'

import MonitorDetailModalView from './MonitorDetailModalView'

export default class MonitorDetailModal extends React.Component {
  onHide () {
    this.props.showmonitorde
  }
  render () {
    return (
      <MonitorDetailModalView
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
