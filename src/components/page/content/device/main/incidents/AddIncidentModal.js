import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../../modal/validation/NameValidation'
import { AddIncidentModalView } from '../../../../../modal'

class AddIncidentModal extends Component {

  handleFormSubmit ({name, desc, severity}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('desc: ', desc)
    console.log('severity: ', severity)
    this.onClickSave(name, desc, severity)
    this.onClickClose()
  }

  onClickClose () {
    this.props.closeAddDeviceIncident()
  }

  onClickSave (name, description, severity) {
    this.props.addDeviceIncident({
      deviceid: this.props.device.id,
      name: name,
      description: description,
      category: 'simulation',
      severity: severity,
      acknowledged: 0,
      startTimestamp: new Date().getTime(),
      fixed: 0
    })
  }

  render () {
    let options = [
      { value: 'HIGH', label: 'High' },
      { value: 'MEDIUM', label: 'Medium' },
      { value: 'LOW', label: 'Low' },
      { value: 'AUDIT', label: 'Audit' }
    ]
    const { handleSubmit } = this.props
    return (
      <AddIncidentModalView
        show={this.props.open}
        onHide={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        options={options}
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
