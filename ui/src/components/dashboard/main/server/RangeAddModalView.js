import React from 'react'
import {Form, Field} from 'redux-form'

import {Modal, CardPanel, FormInput} from 'components/modal/parts'

export default class RangeAddModalView extends React.Component {
  render () {
    const {onSubmit, onHide} = this.props
    return (
      <Modal title="Range" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Range">
            <Field name="from" component={FormInput} floatingLabel="From" />
            <Field name="to" component={FormInput} floatingLabel="To" className="margin-md-left" />
          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
