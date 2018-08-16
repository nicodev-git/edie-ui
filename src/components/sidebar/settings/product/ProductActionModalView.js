import React from 'react'
import {Field} from 'redux-form'

import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductActionModalView extends React.Component {
  render () {
    const {onClose, onSubmit} = this.props
    return (
      <Modal title="Action" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action">
            <Field name="name" component={FormInput} floatingLabel="Name" fullWidth/>
            <Field name="regex" component={FormInput} floatingLabel="Regex" className="margin-md-top" fullWidth/>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}