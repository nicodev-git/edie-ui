import React from 'react'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestCaseModalView extends React.Component {
  renderContent () {
    return (
      <CardPanel>

      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          {this.renderContent()}
        </form>
      </Modal>
    )
  }
}