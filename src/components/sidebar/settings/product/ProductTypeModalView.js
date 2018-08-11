import React from 'react'
import {Modal, CardPanel, SubmitBlock} from 'components/modal/parts'

export default class ProductTypeModalView extends React.Component {
  render () {
    const {onClose, onSubmit} = this.props
    return (
      <Modal title="Product Type" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Product Type">

          </CardPanel>

          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}