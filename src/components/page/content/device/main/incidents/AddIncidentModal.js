import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../../modal/validation/NameValidation'
import { AddIncidentModalView } from '../../../../../modal'

class AddIncidentModal extends Component {

  handleFormSubmit ({name, files}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('file: ', files)
    this.onHide()
  }

  onClickClose () {
    this.props.closeAddDeviceIncident()
  }

  onClickSave () {
    this.props.addDeviceIncident({
      deviceid: this.props.device.id,
      name: this.refs.name.value,
      description: this.refs.desc.value,
      category: 'simulation',
      severity: this.refs.severity.value,
      acknowledged: 0,
      startTimestamp: new Date().getTime(),
      fixed: 0
    })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <AddIncidentModalView
        show={this.props.open}
        onHide={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    open: true
  }), {})(reduxForm({
    form: 'addIncidentModal',
    validate
  })(AddIncidentModal))
