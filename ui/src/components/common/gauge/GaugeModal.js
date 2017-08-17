import React from 'react'

import GaugeModalView from './GaugeModalView'

export default class GaugeModal extends React.Component {
  onHide () {
    this.props.showGaugeModal(false)
  }
  render () {
    const {gauge, content} = this.props.gauge
    return (
      <GaugeModalView
        title={gauge.name}
        onHide={this.onHide.bind(this)}
        content={content}
      />
    )
  }
}
