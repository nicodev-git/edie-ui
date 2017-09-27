import React from 'react'
import { CloseButton, Modal, CardPanel } from 'components/modal/parts'


export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide}>
        <CardPanel title="Detail">

        </CardPanel>
      </Modal>
    )
  }
}
