import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestCaseModalView from './TestCaseModalView'
import TestMessageModal from './TestMessageModal'
import TestTemplateModal from "./TestTemplateModal";
// import {showAlert} from 'components/common/Alert'

class TestCaseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: props.editCase ? (props.editCase.messages || []) : [],

      msgModalOpen: false,
      editMsg: null,

      tplModalOpen: false
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
      tplModalOpen: false
      // msgModalOpen: true,
      // editMsg: null
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

  onClickCopyMsg (editMsg) {
    const {editCase} = this.props
    this.setState({
      messages: [...this.state.messages, editMsg]
    }, () => {
      if (editCase.id) {
        this.triggerSave()
      }
    })
  }

  onCloseMsgModal () {
    this.setState({
      msgModalOpen: false
    })
  }

  onSubmitMsg (msg) {
    const {editCase} = this.props
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
    }, () => {
      if (editCase.id) {
        this.triggerSave()
      }
    })
  }

  triggerSave () {
    const {editCase, onSubmit, allValues} = this.props
    let {messages} = this.state

    onSubmit({
      ...editCase,
      ...allValues,
      messages
    })
  }

  ////////////////////////////////////////////////////////

  onCloseTplModal () {
    this.setState({
      tplModalOpen: false
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

  renderTplModal () {
    if (!this.state.tplModalOpen) return null
    return (
      <TestTemplateModal
        onClose={this.onCloseTplModal.bind(this)}
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
        onClickCopyMsg={this.onClickCopyMsg.bind(this)}

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