import React from 'react'
import {Field} from 'redux-form'
import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductEditModalView extends React.Component {
  render () {
    const {onClose, onSubmit} = this.props
    return (
      <Modal title="Product" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Product">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}