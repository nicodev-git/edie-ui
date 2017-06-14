import React from 'react'
import {Dialog} from 'material-ui'
import InfiniteTable from 'components/shared/InfiniteTable'

const InsidentEventsModalView = ({onClose, params, cells}) => (
  <Dialog open title="Incident Events" onRequestClose={onClose}>
    <div className="small-modal-table">
      <InfiniteTable
        url="/bi/getAllAttackers"
        params={params}
        cells={cells}
        rowMetadata={{'key': 'ipaddress'}}
        bodyHeight={500}
        selectable
      />
    </div>
  </Dialog>
)

export default IncidentEventsModalView
