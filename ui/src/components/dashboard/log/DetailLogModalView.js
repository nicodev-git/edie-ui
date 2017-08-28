import React from 'react'
import moment from 'moment'

import { Modal } from 'components/modal/parts'

import {dateFormat} from 'shared/Global'

export default class DetailLogModalView extends React.Component {
  renderTable () {
    const list = this.props.items

    return (
      <div className="bg-white">
        {list.map((row, index) =>
          <div key={row.id}>
            <div dangerouslySetInnerHTML={{__html: row.entity && row.entity.dataobj ? row.entity.dataobj.line : ' '}}/>
          </div>
        )}
      </div>
    )
  }

  render () {
    const {onHide} = this.props
    return (
      <Modal title="Log" onRequestClose={onHide}>
        {this.renderTable()}
      </Modal>
    )
  }
}
