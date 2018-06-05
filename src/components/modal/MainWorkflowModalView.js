import React, { Component } from 'react'

import { Modal } from 'components/modal/parts'

export default class MainWorkflowModalView extends Component {
  render () {
    const {onSubmit, wizard, onClose, noModal} = this.props
    const content = (
      <form onSubmit={onSubmit}>
        {wizard}
      </form>
    )
    if (noModal) return content
    return (
      <Modal title="Workflow" onRequestClose={onClose}>
        {content}
      </Modal>
    )
  }
}
