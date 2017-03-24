import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'

export default class MainWorkflowModalView extends Component {
  render () {
    const {onClose, onSubmit, wizard} = this.props
    return (
      <Modal
        show
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message p-none">
          <form onSubmit={onSubmit}>
            {wizard}
          </form>
        </div>
      </Modal>
    )
  }
}
