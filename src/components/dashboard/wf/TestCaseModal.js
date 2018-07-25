import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestCaseModalView from './TestCaseModalView'
import TestMessageModal from './TestMessageModal'
// import {showAlert} from 'components/common/Alert'

class TestCaseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],

      msgModalOpen: false,
      editMsg: null
    }
  }

  onSubmit (values) {
    const {onSubmit} = this.props


    onSubmit(values)
  }

  onClickAddMsg () {
    this.setState({
      msgModalOpen: true,
      editMsg: null
    })
  }

  onClickEditMsg () {

  }

  onCloseMsgModal () {
    this.setState({
      msgModalOpen: false
    })
  }

  onSubmitMsg (msg) {
    const {editMsg} = this.props
    let {messages} = this.state
    if (editMsg) {
      const index = messages.indexOf(editMsg)
      if (index >= 0) {
        messages = messages.map((p, i) => i === index ? msg : p)
      }
    } else {
      messages = [...messages, msg]
    }

    this.setState({
      messages
    })
  }

  ////////////////////////////////////////////////////////

  renderMsgModal () {
    if (!this.state.msgModalOpen) return null
    return (
      <TestMessageModal
        onSubmit={this.onSubmitMsg.bind(this)}
        onClose={this.onCloseMsgModal.bind(this)}
      />
    )
  }

  render () {
    const {
      handleSubmit, onClickClose, allValues
    } = this.props
    return (
      <TestCaseModalView
        messages={this.state.messages}
        allValues={allValues}

        onClickAddMsg={this.onClickAddMsg.bind(this)}

        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClickClose}
      >
        {this.renderMsgModal()}
      </TestCaseModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {},
    allValues: getFormValues('wfTestCaseForm')(state)
  })
)(reduxForm({form: 'wfTestCaseForm'})(TestCaseModal))