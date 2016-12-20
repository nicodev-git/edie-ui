import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'
import { connect } from 'react-redux'
import { assign, concat } from 'lodash'

import { updateDeviceIncident } from 'actions/index'

class CommentsModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        let {comments}  = this.props.incident

        return (
            <Modal show={true} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Reason
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>
                <div className="modal-body bootstrap-dialog-message">

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-2 padding-xs-top">Reason</label>

                        <div className="col-md-8">
                            <textarea className="form-control" ref="comment"></textarea>
                        </div>

                        <div className="col-md-2">
                            <a href="javascript:;" className="btn btn-primary btn-sm"
                               onClick={this.onClickAdd.bind(this)}>Add</a>
                        </div>
                    </div>
                    
                    <div style={{overflow: "auto", maxHeight: "300px"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>

                            {(comments || []).map((item, index) =>
                                <tr key={index}>
                                    <td>{moment(item.dateCreated).format('YYYY-MM-DD')}</td>
                                    <td>{item.user}</td>
                                    <td>{item.text}</td>
                                </tr>
                            )}

                            </tbody>
                        </table>
                    </div>

                    <div className="text-right p-none">
                        <a href="javascript:;" className="btn btn-default btn-sm"
                           onClick={this.onClickClose.bind(this)}>Close</a>
                    </div>
                    
                </div>
            </Modal>
        )
    }

    componentWillMount() {

    }

    /////////////////////////////////////////////////////////////

    onHide() {
        this.onClickClose()
    }

    onClickClose() {
        this.props.onClose &&
        this.props.onClose(this)
    }

    /////////////////////////////////////////////////////////////

    onClickAdd() {
        const text = this.refs.comment.value
        if (!text) return showAlert("Please input reason.")

        const params = {
            text,
            dateCreated: new Date().getTime(),
            user: '',
        }

        let incident = assign({}, this.props.incident)
        incident.comments = concat(incident.comments || [], params)

        this.props.updateDeviceIncident(incident)
    }
}

CommentsModal.defaultProps = {
    onClose: null,
    incident: {},
}


function mapStateToProps(state) {
    return {

    }
}

const actions = {
    updateDeviceIncident
}

export default connect(mapStateToProps, actions)(CommentsModal)