import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestMessageModalView from './TestMessageModalView'

class TestMessageModal extends React.Component {
  constructor (props) {
    super(props)

    const fields = []

    let {messages} = props.initialValues || {}
    messages = messages || []
    messages = messages.map((value, id) => ({
      id,
      ...value
    }))

    this.state = {
      messages
    }
  }
  onSubmit (values) {
    const {onSubmit} = this.props


    onSubmit(values)
  }

  render() {
    const {handleSubmit, onClickClose} = this.props
    return (
      <TestMessageModalView
        messages={this.state.messages}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {},
    allValues: getFormValues('wfTestMsgForm')(state)
  })
)(reduxForm({form: 'wfTestMsgForm'})(TestMessageModal))
