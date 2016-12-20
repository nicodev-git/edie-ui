import React from 'react'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'

class IncidentEventsModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return (
            <Modal show={true} onHide={this.onHide.bind(this)}
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
                    <div style={{maxHeight: "300px", overflow: "auto"}}>
                        {this.renderTable()}
                    </div>
                </div>
            </Modal>
        )
    }

    renderTable() {
        const {events} = this.props.incident
        return (
            <table className="table table-hover dataTable">
                <tbody>{
                    (events || []).map(e =>
                    <tr>
                        <td>{moment(e.datetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{e.severity}</td>
                        <td>{e.description}</td>
                    </tr>)
                }</tbody>
            </table>
        )
    }

    onHide() {

    }

    onClickClose() {
        this.props.onClose &&
        this.props.onClose(this)
    }
}

IncidentEventsModal.defaultProps = {
    incident: null,
    onClose: null,
}

export default IncidentEventsModal