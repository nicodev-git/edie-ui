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
  onClickRefresh () {
    this.props.fetchCollectors()
  }
  onClickTest () {

  }
  render () {
    const {collectors} = this.props
    return (
      <CollectorInstallModalView
        onHide={this.onHide.bind(this)}
        onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}

        collectors={collectors}
        onClickRefresh={this.onClickRefresh.bind(this)}
        onClickTest={this.onClickTest.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
  })
)(reduxForm({form: 'collectorInstallForm'})(CollectorInstallModal))
