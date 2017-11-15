import React from 'react'
import {Modal, CardPanel} from 'components/modal/parts'

export default class ServerCmdModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Command" onRequestClose={onHide}>
        <CardPanel title="Command">

        </CardPanel>
      </Modal>
    )
  }
}
