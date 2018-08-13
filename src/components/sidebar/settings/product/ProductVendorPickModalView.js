import React from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'
import {Modal, CardPanel, SubmitBlock, FormSelect, FormInput} from 'components/modal/parts'

export default class ProductVendorPickModalView extends React.Component {
  render () {
    const {onClose, onSubmit, onChooseExisting, productVendors} = this.props
    return (
      <Modal title="Product Vendor" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="New">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
            <SubmitBlock name="Save"/>
          </CardPanel>

          <CardPanel title="Existing">
            <Field name="existingId" component={FormSelect} floatingLabel="Existing" className="margin-md-right"
                   options={productVendors.map(p => ({label: p.name, value: p.id}))}
                   style={{minWidth: 120}}/>
            <Button variant="raised" onClick={onChooseExisting}>Add</Button>
          </CardPanel>
        </form>
      </Modal>
    )
  }
}