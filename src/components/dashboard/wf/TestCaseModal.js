import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestCaseModalView from './TestCaseModalView'
// import {showAlert} from 'components/common/Alert'

class TestCaseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  onSubmit (values) {
    const {onSubmit} = this.props


    onSubmit(values)
  }


  render () {
    const {
      handleSubmit, onClickClose, allValues
    } = this.props
    return (
      <TestCaseModalView
        messages={this.state.messages}
        allValues={allValues}

        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {},
    allValues: getFormValues('wfTestCaseForm')(state)
  })
)(reduxForm({form: 'wfTestCaseForm'})(TestCaseModal))