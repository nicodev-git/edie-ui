import React from 'react'
import Modal from 'react-bootstrap-modal'

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
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Incident Detail
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
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
        </div>
      </Modal>
    )
  }
}

IncidentDetailModal.defaultProps = {
  onClose: null
}
