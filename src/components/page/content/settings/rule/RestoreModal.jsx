import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button,
} from 'react-bootstrap'
import { showAlert } from 'components/shared/Alert.jsx'

class RestoreModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            files: []
        }
    }

    componentWillMount() {
        $.get(Api.rule.listOfBackupFiles, (res) => {
            this.setState({ files: res.object })
        })
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
                            <select className="form-control" ref="name">{
                                this.state.files.map(item =>
                                    <option key={item}>{item}</option>
                                )
                            }</select>
                        </div>
                    </div>

                    <div className="text-right p-none">
                        <Button className="btn-primary"
                                onClick={this.onClickSave.bind(this)}>Restore</Button>
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
        if (!name) return showAlert("Please choose backup.")

        $.get(Api.rule.restoreRules, {
            exportName: name,
        }).done((res) => {
            showAlert("Restored successfully.")
            this.closeModal(true)
        }).fail(() => {
            showAlert("Restore failed!");
        })
    }
}

RestoreModal.defaultProps = {}

export default RestoreModal