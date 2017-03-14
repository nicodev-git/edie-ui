import React from 'react'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'

export default class IncidentEventsModal extends React.Component {
  renderTable () {
    const {events} = this.props.selectedIncident
    return (
      <table className="table table-hover dataTable">
        <tbody>{
          (events || []).map((e, i) =>
            <tr key={i}>
              <td>{moment(e.datetime).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{e.severity}</td>
              <td>{e.description}</td>
            </tr>)
        }</tbody>
      </table>
    )
  }

  onHide () {

  }

  onClickClose () {
    this.props.closeIncidentEventsModal()
  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)}
             aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Incident Events
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '300px', overflow: 'auto'}}>
            {this.renderTable()}
          </div>
        </div>
      </Modal>
    )
  }
}
