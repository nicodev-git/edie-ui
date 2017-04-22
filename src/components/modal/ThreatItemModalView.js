import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, CloseButton } from './parts'
import {renderEntity} from 'components/shared/CellRenderers'

export default class ThreatItemModalView extends React.Component {
  render () {
    const {entity, onHide} = this.props
    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Details" />
        <div className="modal-body bootstrap-dialog-message">
          <div>
            {renderEntity(entity)}
          </div>
        </div>
        <CloseButton onClose={onHide} />
      </Modal>
    )
  }
}
