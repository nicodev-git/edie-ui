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
      messages: props.editCase ? (props.editCase.messages || []) : [],

      msgModalOpen: false,
      editMsg: null
    }
  }

  onSubmit (values) {
    const {onSubmit, editCase} = this.props
    const {messages} = this.state

    onSubmit({
      ...editCase,
      ...values,
      messages
    })
  }

  onClickAddMsg () {
    this.setState({
      msgModalOpen: true,
      editMsg: null
    })
  }

  onClickEditMsg (editMsg) {
    this.setState({
      msgModalOpen: true,
      editMsg
    })
  }

  onClickDeleteMsg (index) {
    if (!window.confirm('Click OK to delete')) return
    const {messages} = this.state
    this.setState({
      messages: messages.filter((p, i) => i !== index)
    })
  }

  onCloseMsgModal () {
    this.setState({
      msgModalOpen: false
    })
  }

  onSubmitMsg (msg) {
    const {editCase, onSubmit, allValues} = this.props
    let {messages, editMsg} = this.state
    if (editMsg) {
      const index = messages.indexOf(editMsg)
      if (index >= 0) {
        messages = messages.map((p, i) => i === index ? msg : p)
      }
    } else {
      messages = [...messages, msg]
    }

    this.setState({
      messages,
      msgModalOpen: false
    })


    if (editCase.id) {
      onSubmit({
        ...editCase,
        ...allValues,
        messages
      })
    }
  }

  onClickPost () {
    const {messages} = this.state
    this.props.onClickPost(messages)
  }

  ////////////////////////////////////////////////////////

  renderMsgModal () {
    if (!this.state.msgModalOpen) return null
    return (
      <TestMessageModal
        editMsg={this.state.editMsg}
        onSubmit={this.onSubmitMsg.bind(this)}
        onClose={this.onCloseMsgModal.bind(this)}
      />
    )
  }

  render () {
    const {
      handleSubmit, onClickClose, allValues, noModal
    } = this.props
    return (
      <TestCaseModalView
        messages={this.state.messages}
        allValues={allValues}
        noModal={noModal}

        onClickAddMsg={this.onClickAddMsg.bind(this)}
        onClickEditMsg={this.onClickEditMsg.bind(this)}
        onClickDeleteMsg={this.onClickDeleteMsg.bind(this)}

        onClickPost={this.onClickPost.bind(this)}
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
    initialValues: props.editCase,
    allValues: getFormValues('wfTestCaseForm')(state)
  })
)(reduxForm({form: 'wfTestCaseForm'})(TestCaseModal))