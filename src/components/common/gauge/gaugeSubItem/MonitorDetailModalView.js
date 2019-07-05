import React from 'react'
import { Modal } from 'components/modal/parts'

import GaugeMap from 'components/common/gauge/GaugeMap'

const containerStyle = {
  height: 400,
  position: 'relative',
  marginTop: 40
}

export default class MonitorDetailModalView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: Math.ceil(Math.random() * 100)
    }
  }
  renderGauge (p) {
    let GaugePanel = GaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div/>
    return (
      <GaugePanel
        {...this.props}
        device={{id: p.deviceId}}
        modalView
      />
    )
  }
  render () {
    const {onHide, title, gauge} = this.props
    return (
      <Modal title={title} onRequestClose={onHide} contentStyle={{}}>
        <div className="flex-vertical" style={containerStyle}>
          {gauge && this.renderGauge(gauge)}
        </div>
      </Modal>
    )
  }
}
