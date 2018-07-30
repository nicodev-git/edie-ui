import React from 'react'

import {
  FormInput,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestMessageEditModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Message" onRequestClose={onClickClose}>
        <CardPanel title="Message">

        </CardPanel>
      </Modal>
    )
  }
}