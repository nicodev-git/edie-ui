import React from 'react'
import {connect} from "react-redux"
import {reduxForm, getFormValues} from 'redux-form'
import uuid from 'uuid'
import ActionRegexModalView from './ActionRegexModalView'

class ActionRegexModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      realText: '',
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

  onChangeRealText (e) {
    this.setState({
      realText: e.target.value
    })
  }

  onClickMatch () {
    const {allValues} = this.props
    const {realText} = this.state

    this.setState({
      matchResult: '',
      loading: true
    })
    this.props.testMatchRegex(allValues.regex, realText, res => {
      this.setState({
        matchResult: res ? 'true' : 'false',
        loading: false
      })
    })
  }

  render () {
    const {realText, matchResult, loading} = this.state
    const {handleSubmit, onClose, actions} = this.props
    return (
      <ActionRegexModalView
        actions={actions}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        realText={realText}
        matchResult={matchResult}
        onChangeRealText={this.onChangeRealText.bind(this)}
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