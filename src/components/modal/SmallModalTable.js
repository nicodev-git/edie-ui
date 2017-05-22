import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from 'components/shared/InfiniteTable'
import { Header, CloseButton, TwoButtonsBlock } from './parts'

const SmallModalTable = ({show, header, url, row, height, onHide,
  params, cells, save, onSave, data, useExternal, customWidth}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className={`bootstrap-dialog type-primary ${customWidth || 'modal-600'}`}
  >
    <Header name={header} />
    <div className="modal-body bootstrap-dialog-message small-modal-table">
      <div style={{height: height, overflow: 'auto'}}>
        <InfiniteTable
          id="table"
          url={url}
          params={params}
          cells={cells}
          rowMetadata={row}
          bodyHeight={height}
          pageSize={20}
          data={data}
          useExternal={useExternal}
          selectable
        />
      </div>
    </div>
    <div className="padding-md-bottom">
      {save ? <TwoButtonsBlock onSave={onSave} onClose={onHide}/> : <CloseButton onClose={onHide} />}
    </div>
  </Modal>
)

export default SmallModalTable
