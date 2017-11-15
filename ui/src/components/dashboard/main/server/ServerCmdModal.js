import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ServerCmdModalView from './ServerCmdModalView'

class ServerCmdModal extends React.Component {
  onSubmit (values) {

  }
  render () {
    const {onHide, handleSubmit} = this.props
    return (
      <ServerCmdModalView
        onHide={onHide}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'serverCmdForm'})(ServerCmdModal))
