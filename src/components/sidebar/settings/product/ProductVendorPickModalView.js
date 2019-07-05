import React from 'react'
import {Field} from 'redux-form'
import {FormControlLabel, Radio} from '@material-ui/core'
import {Modal, CardPanel, SubmitBlock, FormSelect, FormInput, FormRadioGroup} from 'components/modal/parts'

export default class ProductVendorPickModalView extends React.Component {
  render () {
    const {onClose, onSubmit, productVendors} = this.props
    return (
      <Modal title="Product Vendor" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel>
            <div className="flex-horizontal">
              <div>
                <Field name="addType" component={FormRadioGroup} className="margin-md-top">
                  <FormControlLabel control={<Radio />} value="new" label="New"/>
                  <FormControlLabel control={<Radio />} value="existing" label="Existing"/>
                </Field>
              </div>
              <div className="flex-1 padding-sm-top">
                <Field name="name" component={FormInput} className="margin-md-top" fullWidth/>

                <Field name="existingId" component={FormSelect} className="margin-md-top"
                       options={productVendors.map(p => ({label: p.name, value: p.id}))}
                       style={{minWidth: 120}}/>
              </div>
            </div>

            <SubmitBlock name="Save"/>
          </CardPanel>
        </form>
      </Modal>
    )
  }
}