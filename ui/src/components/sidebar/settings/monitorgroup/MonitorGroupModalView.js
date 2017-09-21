import React from 'react'

import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorGroupModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitor Group" onRequestClose={onHide}>
        <CardPanel title="Monitor Group">

        </CardPanel>
      </Modal>
    )
  }
}
