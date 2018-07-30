import React from 'react'

import TestTemplateModalView from './TestTemplateModalView'

import {messageTypes} from 'shared/SimulationMessages'

export default class TestTemplateModal extends React.Component {
  render() {
    const {onClose, onClickTpl} = this.props
    return (
      <TestTemplateModalView
        messageTypes={messageTypes}
        onClickClose={onClose}
        onClickTpl={onClickTpl}
      />
    )
  }
}