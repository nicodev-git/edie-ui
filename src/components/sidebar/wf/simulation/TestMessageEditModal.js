import React from 'react'
import {find} from 'lodash'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestMessageEditModalView from './TestMessageEditModalView'
import {messageTypes} from 'shared/SimulationMessages'

class TestMessageEditModal extends React.Component {
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

  onSubmit (values) {
    const entity = {
      ...this.props.editMsg,
      values
    }
    this.props.onSubmit(entity)
  }

  render() {
    const {handleSubmit, onClose, userConnectors} = this.props
    return (
      <TestMessageEditModalView
        msgType={this.getMessageType()}

        userConnectors={userConnectors}

        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editMsg ? props.editMsg.values : {},
    allValues: getFormValues('wfTestMsgEditForm')(state)
  })
)(reduxForm({form: 'wfTestMsgEditForm'})(TestMessageEditModal))