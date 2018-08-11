import React from 'react'
import {Field} from 'redux-form'
import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductVendorModalView extends React.Component {
  render () {
    const {onClose, onSubmit} = this.props
    return (
      <Modal title="Product Vendor" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Product Vendor">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}