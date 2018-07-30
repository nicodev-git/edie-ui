import React from 'react'

import TestTemplateModalView from './TestTemplateModalView'

import {messageTypes} from 'shared/SimulationMessages'

export default class TestTemplateModal extends React.Component {
  onClickType (tpl) {

  }
  render() {
    const {onClose} = this.props
    return (
      <TestTemplateModalView
        messageTypes={messageTypes}
        onClickClose={onClose}
        onClickType={this.onClickType.bind(this)}
      />
    )
  }
}