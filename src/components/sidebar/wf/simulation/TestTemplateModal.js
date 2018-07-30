import React from 'react'

import TestTemplateModalView from './TestTemplateModalView'

export default class TestTemplateModal extends React.Component {
  render() {
    const {onClose} = this.props
    return (
      <TestTemplateModalView
        onClickClose={onClose}
      />
    )
  }
}