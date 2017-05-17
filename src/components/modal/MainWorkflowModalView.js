import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

export default class MainWorkflowModalView extends Component {
  render () {
    const {onSubmit, wizard} = this.props
    return (
      <Modal
        show
        aria-labelledby="ModalHeader"
        onHide={() => {}}
        className="bootstrap-dialog type-primary">
        <Header name="Workflow"/>
        <div className="modal-body bootstrap-dialog-message p-none">
          <form onSubmit={onSubmit}>
            {wizard}
          </form>
        </div>
      </Modal>
    )
  }
}
