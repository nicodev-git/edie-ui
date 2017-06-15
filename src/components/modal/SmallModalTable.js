import React from 'react'
import {Dialog} from 'material-ui'
import InfiniteTable from 'components/shared/InfiniteTable'
import { CloseButton, TwoButtonsBlock } from 'components/modal/parts'

const SmallModalTable = ({show, header, url, row, height, onHide,
  params, cells, save, onSave, data, useExternal, customWidth}) => (
  <Dialog open title={header}>
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
  </Dialog>
)

export default SmallModalTable
