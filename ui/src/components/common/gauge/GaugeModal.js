import React from 'react'

import GaugeModalView from './GaugeModalView'

export default class GaugeModal extends React.Component {
  onHide () {
    this.props.showGaugeModal(false)
  }
  render () {
    const {editGauge} = this.props.gauge
    return (
      <GaugeModalView
        {...this.props}
        title={editGauge.name}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
