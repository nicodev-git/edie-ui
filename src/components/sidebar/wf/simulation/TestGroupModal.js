import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestGroupModalView from './TestGroupModalView'

class TestGroupModal extends React.Component {
  onSubmit (values) {
    console.log(values)
    if (!values.name) return alert('Please input name')
    if (!values.type) return alert('Please check type')

    this.props.onSubmit(values)
  }

  render () {
    const {
      handleSubmit, onClickClose
    } = this.props
    return (
      <TestGroupModalView
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editGroup,
    allValues: getFormValues('wfTestGroupForm')(state)
  })
)(reduxForm({form: 'wfTestGroupForm'})(TestGroupModal))