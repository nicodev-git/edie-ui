import React from 'react'
import {Form, Field} from 'redux-form'
import {Modal, CardPanel, SubmitBlock, FormCheckbox} from 'components/modal/parts'

export default class EditConfigModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Config" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Config">
            <Field name="hideDuplicate" component={FormCheckbox} label="Hide Duplicates"/>
          </CardPanel>

          <SubmitBlock name="Save"/>
        </Form>
      </Modal>
    )
  }
}
