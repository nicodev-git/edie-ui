import React from 'react'
import InfiniteTable from 'components/common/InfiniteTable'
import { CloseButton, TwoButtonsBlock, Modal } from 'components/modal/parts'

const SmallModalTable = ({show, header, url, row, height, onHide,
  params, cells, save, onSave, data, useExternal, customWidth}) => (
  <Modal title={header} onRequestClose={onHide}>
    <div className="small-modal-table">
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
