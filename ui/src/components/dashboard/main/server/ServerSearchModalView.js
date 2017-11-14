import React from 'react'
import {Form} from 'redux-form'

import {Modal, CardPanel} from 'components/modal/parts'

export default class ServerSearchModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Search" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Search">

          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
