import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from '../shared/InfiniteTable'
import { Header, CloseButton, TwoButtonsBlock } from './parts'

const SmallModalTable = ({show, header, url, row, height, onHide,
  params, cells, save, onSave}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name={header} />
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
    {save ? <TwoButtonsBlock onSave={onSave} onClose={onHide}/> : <CloseButton onClose={onHide} />}
  </Modal>
)

export default SmallModalTable
