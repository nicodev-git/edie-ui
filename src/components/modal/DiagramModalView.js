import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, TwoButtonsBlock } from './parts'

export default class DiagramModalView extends Component {
  render () {
    const {show, header, onHide, onSave, dragLayer, toolbar, sidebar,
      panel, objectModal} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          <div className="diagram">
            {dragLayer}
            {toolbar}
            <div className="flex-horizontal">
              {sidebar}
              {panel}
            </div>
          </div>
          {objectModal}
          <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
