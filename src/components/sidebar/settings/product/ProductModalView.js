import React from 'react'
import {Field} from 'redux-form'

import {Modal, CardPanel} from 'components/modal/parts'

const divStyle = {
  minHeight: 500
}

export default class ProductModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose}>
        <div className="flex-horizontal">
          <CardPanel title="Vendor" className="flex-1">
            <div style={divStyle}>

            </div>
          </CardPanel>
          <div style={{width: 12}}>
          </div>
          <CardPanel title="List" className="flex-1">
            <div style={divStyle}>

            </div>
          </CardPanel>
        </div>
      </Modal>
    )
  }
}