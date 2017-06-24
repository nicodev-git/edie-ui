import React from 'react'
import {Dialog} from 'material-ui'

export default class IncidentDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose && this.props.onClose(this)
    })
  }

  onClickClose () {
    this.onHide()
  }

  render () {
    let data = this.props.incident
    let incidentname = data.description || ''
    let fixstatus = ''
    if (data.fixed) fixstatus = 'Fixed'
    else if (data.acknowledged) fixstatus = 'Acknowledged'
    else fixstatus = 'Not Acknowledged'

    return (
      <Dialog open title="Incident Detail" onRequestClose={this.onHide.bind(this)}>
        <div className="row">
          <label className="control-label col-md-12 bold">Event Details</label>
          <label className="control-label col-md-3">Name:</label>
          <label className="control-label col-md-9">{incidentname || (`Incident for ${data.incidenttype}`)}</label>

          <label className="control-label col-md-3">Description:</label>
          <label className="control-label col-md-9">{data.descriptioninfo || incidentname}</label>

          <label className="control-label col-md-3">Date:</label>
          <label className="control-label col-md-9">{data.starttimestamp}</label>

          <label className="control-label col-md-3">Device:</label>
          <label className="control-label col-md-9">{data.fathername}</label>

          <label className="control-label col-md-3">Severity:</label>
          <label className="control-label col-md-9">{data.incidentseverity}</label>

          <label className="control-label col-md-3">Status:</label>
          <label className="control-label col-md-9">{fixstatus}</label>
        </div>
      </Dialog>
    )
  }
}

IncidentDetailModal.defaultProps = {
  onClose: null
}
