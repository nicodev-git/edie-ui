import React from 'react'
import {Dialog} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class IncidentDetailModal extends React.Component {
  onHide () {
    this.props.onClose && this.props.onClose(this)
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
      <MuiThemeProvider>
        <Dialog open title="Incident Detail" onRequestClose={this.onHide.bind(this)}>
          <div className="row">
            <label className="control-label col-md-12 bold">Event Details</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Name:</label>
            <label className="control-label col-md-9">{incidentname || (`Incident for ${data.incidenttype}`)}</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Description:</label>
            <label className="control-label col-md-9">{data.descriptioninfo || incidentname}</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Date:</label>
            <label className="control-label col-md-9">{data.starttimestamp}</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Device:</label>
            <label className="control-label col-md-9">{data.fathername}</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Severity:</label>
            <label className="control-label col-md-9">{data.incidentseverity}</label>
          </div>
          <div className="row">
            <label className="control-label col-md-3">Status:</label>
            <label className="control-label col-md-9">{fixstatus}</label>
          </div>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

IncidentDetailModal.defaultProps = {
  onClose: null
}
