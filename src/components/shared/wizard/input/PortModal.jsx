import React from 'react'
import Modal from 'react-bootstrap-modal'
import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'

export default class PortModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    onHide() {
        this.onClickClose()
    }

    onClickClose() {
        this.closeModal();
    }

    onClickSave() {
        let data = {
            name: this.refs.name.value,
            port: this.refs.port.value,
        }

        if (!data.name || !data.port) {
            showAlert("Please input name and port.")
            return
        }

        this.closeModal(data);
    }

    closeModal(data) {
        this.setState({
            open: false
        }, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    render() {
        return (
            <Modal show={this.state.open}
                   onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader"
                   className="bootstrap-dialog type-primary">
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Add Port
                    </h4>
                </div>
                <div className="modal-body bootstrap-dialog-message">
                    <div className="row margin-md-bottom">
                        <label className="col-md-3">Name:</label>
                        <div className="col-md-9">
                            <input className="form-control" ref="name"/>
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="col-md-3">Port:</label>
                        <div className="col-md-9">
                            <input className="form-control" ref="port"/>
                        </div>
                    </div>

                    <div className="text-right mb-none">

                        <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
                        <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-left" onClick={this.onClickSave.bind(this)}>OK</a>
                    </div>
                </div>
            </Modal>
        )
    }
}

PortModal.defaultProps = {
    onClose: null,
}