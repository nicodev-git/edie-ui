import React from 'react'
import {Field} from "redux-form";

export default class ProductModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose}>
        <div className="flex-horizontal">
          <CardPanel title="Vendor" className="flex-1">

          </CardPanel>
          <CardPanel title="List" className="flex-1">

          </CardPanel>
        </div>
      </Modal>
    )
  }
}