import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestMessageModalView from './TestMessageModalView'

export default class TestMessageModal extends React.Component {
  onSubmit (values) {
    const {onSubmit} = this.props


    onSubmit(values)
  }

  render() {
    return (
      <TestMessageModalView
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
)(reduxForm({form: 'wfTestMsgForm'})(TestCaseModal))
