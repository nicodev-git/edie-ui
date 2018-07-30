import React from 'react'
import {find} from 'lodash'

import TestMessageEditModalView from './TestMessageEditModalView'
import {messageTypes} from 'shared/SimulationMessages'

export default class TestMessageEditModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getMessageType () {
    const {typeName} = this.props
    const msgType = find(messageTypes, {name: typeName})
    return msgType
  }

  render() {
    const {onClose} = this.props
    return (
      <TestMessageEditModalView
        onClickClose={onClose}
      />
    )
  }
}