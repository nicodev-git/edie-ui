import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button,
} from 'react-bootstrap'
import { showAlert } from 'components/shared/Alert.jsx'


class BackupModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    render() {
        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Backup
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message">

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">Name</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" ref="name" />
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">Description</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" ref="desc" />
                        </div>
                    </div>

                    <div className="text-right p-none">
                        <Button className="btn-primary"
                                onClick={this.onClickSave.bind(this)}>Save</Button>
                        <Button className="margin-sm-left"
                                onClick={this.onClickClose.bind(this)}>Cancel</Button>
                    </div>

                </div>
            </Modal>
        )
    }

    onHide() {
        this.onClickClose()
    }

    closeModal(data) {
        this.setState({ open: false}, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    onClickClose() {
        this.closeModal()
    }

    onClickSave() {
        const name = this.refs.name.value
        const desc = this.refs.desc.value

        if (!name) {
            showAlert("Please input backup name.")
            return
        }

        $.get(Api.rule.backupRules, {
            exportName: name,
            description: desc,
        }).done((res) => {
            showAlert("Backup created successfully.")

            this.closeModal()
        }).fail(() => {
            showAlert("Backup failed!")
        })
    }
}

BackupModal.defaultProps = {}

export default BackupModal