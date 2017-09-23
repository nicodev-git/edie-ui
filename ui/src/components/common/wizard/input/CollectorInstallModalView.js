import React from 'react'
import { Field, Form } from 'redux-form'

import { FormInput, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'

export default class CollectorInstallModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Collector Install" onRequestClose={onHide}>
        <Form onSubmit={onSubmit} autoComplete="off">
          <CardPanel>
            <Field name="ip" component={FormInput} floatingLabel="IP"/>
            <Field name="user" component={FormInput} floatingLabel="User"/>
            <Field name="password" component={FormInput} floatingLabel="Password"/>

            <SubmitBlock name="Install"/>
          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
