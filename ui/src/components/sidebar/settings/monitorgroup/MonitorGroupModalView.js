import React from 'react'
import { Form, Field } from 'redux-form'

import { Modal, CardPanel, FormInput, SubmitBlock } from 'components/modal/parts'

export default class MonitorGroupModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Monitor Group" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Monitor Group">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
