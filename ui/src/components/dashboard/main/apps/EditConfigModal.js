import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import EditConfigModalView from './EditConfigModalView'

class EditConfigModal extends React.Component {
  onSubmit (values) {
    this.props.onClickSave(values)
  }
  onHide () {
    this.props.onClickClose()
  }
  render () {
    const {handleSubmit} = this.props
    return (
      <EditConfigModalView
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}/>
    )
  }
}

export default connect(
  state => ({
    initialValues: state.dashboard.appsPref
  })
)(reduxForm({form: 'appsConfigForm'})(EditConfigModal))
