import React from 'react'
import AddIncidentModalView from '../../../../../modal'

export default class AddIncidentModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onHide () {
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
    return (
      <AddIncidentModalView
        show
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
      />
    )
  }
}
