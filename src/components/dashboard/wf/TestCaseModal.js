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
    const {onSubmit, editCase} = this.props
    const {messages} = this.state

    onSubmit({
      ...editCase,
      name: values.name,
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

  onCloseMsgModal () {
    this.setState({
      msgModalOpen: false
    })
  }

  onSubmitMsg (msg) {
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