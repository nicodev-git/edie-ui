import React from 'react'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'
import uuid from 'uuid'
import ActionRegexModalView from './ActionRegexModalView'

class ActionRegexModal extends React.Component {
  handleFormSubmit (values) {
    const {editAction} = this.props
    const entity = {
      ...editAction,
      ...values
    }
    if (!entity.id) entity.id = uuid()
    this.props.onSave(entity)
  }

  render () {
    const {handleSubmit, onClose, actions} = this.props
    return (
      <ActionRegexModalView
        actions={actions}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editAction
  })
)(reduxForm({form: 'prdActionRegexForm'})(ActionRegexModal))