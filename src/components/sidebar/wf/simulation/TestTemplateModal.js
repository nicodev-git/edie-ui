import React from 'react'

import TestTemplateModalView from './TestTemplateModalView'

import {messageTypes} from 'shared/SimulationMessages'

export default class TestTemplateModal extends React.Component {
  render() {
    const {onClose, onClickTpl, groupType} = this.props
    return (
      <TestTemplateModalView
        messageTypes={messageTypes.filter(p => p.group === groupType)}
        onClickClose={onClose}
        onClickTpl={onClickTpl}
      />
    )
  }
}