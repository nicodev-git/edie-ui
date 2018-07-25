import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'
import {keys} from 'lodash'

import TestMessageModalView from './TestMessageModalView'

class TestMessageModal extends React.Component {
  constructor (props) {
    super(props)

    const names = keys(props.initialValues || {})
    const fields = names.map((name, id) => ({
      id,
      name,
      value: props.initialValues[name]
    }))

    this.state = {
      fields
    }
  }
  onSubmit (values) {
    const {onSubmit} = this.props


    onSubmit(values)
  }

  onClickAddMsg () {
    const {fields} = this.state

    const maxId = Math.max.apply(null, fields.map(p => p.id)) + 1
    this.setState({
      fields: [...fields, {
        id: maxId
      }]
    })
  }

  render() {
    const {handleSubmit, onClose} = this.props
    return (
      <TestMessageModalView
        messages={this.state.messages}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClose}

        onClickAddMsg={this.onClickAddMsg.bind(this)}
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
