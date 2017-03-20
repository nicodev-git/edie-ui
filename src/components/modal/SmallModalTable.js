import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from '../shared/InfiniteTable'
import { Header } from './parts'

const SmallModalTable = ({show, header, url, row, height, onHide, onClose, params, cells}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name={header} onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message small-modal-table">
      <InfiniteTable
        url={url}
        params={params}
        cells={cells}
        rowMetadata={row}
        bodyHeight={height}
        pageSize={20}
        selectable
      />
    </div>
  </Modal>
)

export default SmallModalTable
