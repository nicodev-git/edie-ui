import React from 'react'
import {Form, Field} from 'redux-form'

import {Modal, CardPanel, FormInput} from 'components/modal/parts'

export default class ServerCmdModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Command" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Command">
            <Field name="cmd" component={FormInput}/>
          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
