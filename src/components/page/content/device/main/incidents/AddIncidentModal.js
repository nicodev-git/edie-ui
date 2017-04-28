import React, { Component } from 'react'
import { validate } from '../../../../../modal/validation/NameValidation'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

export default class AddIncidentModal extends Component {

  onClickClose () {
    console.log('trying to close')
    this.props.closeAddDeviceIncident()
  }

  onClickSave ({name, description, severity}) {
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
    let header = 'Add incident'
    let options = [
      { value: 'HIGH', label: 'High' },
      { value: 'MEDIUM', label: 'Medium' },
      { value: 'LOW', label: 'Low' },
      { value: 'AUDIT', label: 'Audit' }
    ]
    let content = [
      {name: 'Name'},
      {name: 'Description'},
      {type: 'select', name: 'Severity', options: options}
    ]
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.onClickSave.bind(this)}
        onClose={this.onClickClose.bind(this)}
        validate={validate}
        buttonText="Add Incident"
      />
    )
  }
}
