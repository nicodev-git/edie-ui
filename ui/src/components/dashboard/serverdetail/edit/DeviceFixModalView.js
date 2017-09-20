import React from 'react'
import { Modal } from 'components/modal/parts'

export default class DeviceFixModalView extends React.Component {
  render () {
    const {onHide, msg} = this.props
    return (
      <Modal title="Fix" onRequestClose={onHide}>
        {msg}
      </Modal>
    )
  }
}
