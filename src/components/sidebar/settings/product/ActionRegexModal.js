import React from 'react'
import {connect} from "react-redux"
import {reduxForm, getFormValues} from 'redux-form'
import uuid from 'uuid'
import ActionRegexModalView from './ActionRegexModalView'

class ActionRegexModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchResult: '',
      loading: false
    }
  }
  handleFormSubmit (values) {
    const {editAction} = this.props
    const entity = {
      ...editAction,
      ...values
    }
    if (!entity.id) entity.id = uuid()
    this.props.onSave(entity)
  }

  onClickMatch () {
    const {allValues} = this.props

    this.setState({
      matchResult: '',
      loading: true
    })
    this.props.testMatchRegex(allValues.regex, allValues.sampleText, res => {
      this.setState({
        matchResult: res ? 'true' : 'false',
        loading: false
      })
    })
  }

  render () {
    const {matchResult, loading} = this.state
    const {handleSubmit, onClose, actions} = this.props
    return (
      <ActionRegexModalView
        actions={actions}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        matchResult={matchResult}
        onClickMatch={this.onClickMatch.bind(this)}

        loading={loading}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editAction,
    allValues: getFormValues('prdActionRegexForm')(state)
  })
)(reduxForm({form: 'prdActionRegexForm'})(ActionRegexModal))