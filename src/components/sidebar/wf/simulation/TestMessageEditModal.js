import React from 'react'

import TestMessageEditModalView from './TestMessageEditModalView'

import {messageTypes} from 'shared/SimulationMessages'

export default class TestMessageEditModal extends React.Component {
  render() {
    const {onClose} = this.props
    return (
      <TestMessageEditModalView
        onClickClose={onClose}
      />
    )
  }
}