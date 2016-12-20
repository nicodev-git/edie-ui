import React from 'react'
import Modal from 'react-bootstrap-modal'
import { assign } from 'lodash'

import { showAlert, showConfirm } from 'components/shared/Alert.jsx'

class CredentialEditModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
        }
    }

    render() {
        
        const {data} = this.props
        
        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Credentials
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message">
                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">Name</label>
                        <div className="col-md-9 margin-sm-bottom">
                            <input type="text" className="form-control" ref="name" 
                                   defaultValue={data ? data.name : ''}/>
                        </div>
                    </div>
                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">User Name</label>
                        <div className="col-md-9 margin-sm-bottom">
                            <input type="text" className="form-control" ref="username"
                                   defaultValue={data ? data.username : ''}/>
                        </div>
                    </div>
                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">Password</label>
                        <div className="col-md-9 margin-sm-bottom">
                            <input type="password" className="form-control" ref="password"
                                   defaultValue={data ? data.password : ''}/>
                        </div>
                    </div>
                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3">Description</label>
                        <div className="col-md-9 margin-sm-bottom">
                            <input type="text" className="form-control" ref="description"
                                   defaultValue={data ? data.description : ''}/>
                        </div>
                    </div>
                    <div className="text-right mb-none panel-buttons">
                        <a href="javascript:;" className="btn btn-primary btn-sm"
                           onClick={this.onClickSave.bind(this)}>Save</a>
                        <a href="javascript:;" className="btn btn-default btn-sm"
                           onClick={this.onClickCancel.bind(this)}>Cancel</a>
                    </div>
                </div>
            </Modal>
        )
    }

    onHide() {
        this.onClickClose()
    }

    onClickClose() {
        this.closeModal()
    }

    closeModal(data) {
        this.setState({ open: false}, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    //////////////////////////////////////////////

    onClickSave() {
        let cred = {}
        const refs = this.refs
        const isEdit = !!cred


        assign(cred, this.props.data, {
            name: refs.name.value,
            username: refs.username.value,
            password: refs.password.value,
            description: refs.description.value,
        })

        const url = this.props.data ? Api.devices.editCredential
            : Api.devices.addCredential

        $.get(url, cred).done((res) => {
            if (res.success) {
                this.closeModal(res.object)

            } else {
                showAlert("Save Failed!")
            }
        }).fail(function(){
            showAlert("Save Failed!")
        })
    }

    onClickCancel() {
        this.closeModal()
    }

    //////////////////////////////////////////////
}

CredentialEditModal.defaultProps = {
    onClose: null,
    data: null,
}

export default CredentialEditModal