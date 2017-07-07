import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import CollectorModalView from './CollectorModalView'

class CollectorModal extends React.Component {
  onClickClose () {

  }
  handleFormSubmit () {

  }
  render () {
    const {handleSubmit} = this.props
    return (
      <CollectorModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={this.onClickClose.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {
    }
  })
)(reduxForm({form: 'collectorForm'})(CollectorModal))
