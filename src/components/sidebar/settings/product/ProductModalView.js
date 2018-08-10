import React from 'react'
import {Field} from 'redux-form'

import {Modal, CardPanel} from 'components/modal/parts'

export default class ProductModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose}>
        <div className="flex-horizontal">
          <CardPanel title="Vendor" className="flex-1">

          </CardPanel>
          <div style={{width: 12}}>
          </div>
          <CardPanel title="List" className="flex-1">

          </CardPanel>
        </div>
      </Modal>
    )
  }
}