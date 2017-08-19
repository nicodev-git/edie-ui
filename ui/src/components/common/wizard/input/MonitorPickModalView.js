import React from 'react'
import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorPickModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onHide}>
        <CardPanel className="margin-md-bottom">
        </CardPanel>
      </Modal>
    )
  }
}
