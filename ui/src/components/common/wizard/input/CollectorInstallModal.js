import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import CollectorInstallModalView from './CollectorInstallModalView'

class CollectorInstallModal extends React.Component {
  onHide () {
    this.props.showCollectorInstallModal(false)
  }
  handleFormSubmit (values) {
    console.log(values)
  }
  render () {
    return (
      <CollectorInstallModalView
        onHide={this.onHide.bind(this)}
        onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'collectorInstallForm'})(CollectorInstallModal))
