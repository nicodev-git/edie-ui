import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from 'components/shared/InfiniteTable'
import { Header } from './parts'

const InsidentEventsModalView = ({show, onHide, onClose, params, cells}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Incident Events" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message small-modal-table">
      <InfiniteTable
        url="/bi/getAllAttackers"
        params={params}
        cells={cells}
        rowMetadata={{'key': 'ipaddress'}}
        bodyHeight={500}
        selectable
      />
    </div>
  </Modal>
)

export default IncidentEventsModalView
