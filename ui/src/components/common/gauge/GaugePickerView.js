import React from 'react'
import { Modal } from 'components/modal/parts'

export default class GaugePickerView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 1058, maxWidth: 'initial'}}>
        <ul className="web-applet-cards" style={{marginTop: 40}}>

        </ul>
      </Modal>
    )
  }
}
