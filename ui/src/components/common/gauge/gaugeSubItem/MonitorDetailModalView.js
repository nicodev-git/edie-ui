import React from 'react'
import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorDetailModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitor" onRequestClose={onHide} contentStyle={{}}>
        <CardPanel>

        </CardPanel>
      </Modal>
    )
  }
}
