import React from 'react'

import {Modal} from 'components/modal/parts'

import GaugeMap from 'components/common/gauge/GaugeMap'

export default class GaugeModalView extends React.Component {

  renderGauge (p) {
    let GaugePanel = GaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div/>
    return (
      <GaugePanel
        {...this.props}
        gauge={this.props.editGauge}
        device={{id: p.deviceId}}
        modalView
      />
    )
  }

  render () {
    const {header, onHide, editGauge} = this.props
    return (
      <Modal title={header} onRequestClose={onHide}>
        <div style={{height: 400}}>
          {this.renderGauge(editGauge)}
        </div>
      </Modal>
    )
  }
}
