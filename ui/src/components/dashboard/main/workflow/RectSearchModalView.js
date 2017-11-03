import React from 'react'

import {Modal, CardPanel} from 'components/modal/parts'

export default class RectSearchModalView extends React.Component {
  render () {
    const {onHide, params, onRowDblClick} = this.props
    return (
      <Modal title="Search Result" onRequestClose={onHide} contentStyle>
        <CardPanel title="Search Result">
          <InfiniteTable
            url="/search/query"
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            onRowDblClick={onRowDblClick}
            params={params}
            pageSize={10}
            showTableHeading={false}
            selectable
          />
        </CardPanel>
      </Modal>
    )
  }
}
