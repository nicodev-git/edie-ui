import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'

import TestCaseModalView from './TestCaseModalView'
import TestMessageEditModal from './TestMessageEditModal'
import TestTemplateModal from './TestTemplateModal'
// import {showAlert} from 'components/common/Alert'

class TestGroupModal extends React.Component {
  onSubmit (values) {

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
        {this.renderTplModal()}
      </TestCaseModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editGroup,
    allValues: getFormValues('wfTestGroupForm')(state)
  })
)(reduxForm({form: 'wfTestGroupForm'})(TestGroupModal))