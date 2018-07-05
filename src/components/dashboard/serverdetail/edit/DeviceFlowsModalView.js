import React from 'react'
import {Form} from 'redux-form'
import { Modal } from 'components/modal/parts'

export default class DeviceFlowsModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>

        </Form>
      </Modal>
    )
  }
}
