import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ServerSearchModalView from './ServerSearchModalView'

class ServerSearchModal extends React.Component {
  onSubmit (values) {
    console.log(values)
    this.props.onSubmit(values)
  }
  render () {
    const {onHide, handleSubmit} = this.props
    return (
      <ServerSearchModalView
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
)(reduxForm({form: 'serverSearchForm'})(ServerSearchModal))
