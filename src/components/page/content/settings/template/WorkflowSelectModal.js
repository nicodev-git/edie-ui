import React from 'react'
import Modal from 'react-bootstrap-modal'

export default class WorkflowSelectModal extends React.Component {
    componentWillMount () {
        this.props.fetchWorkflows()
    }
    onHide () {
    }
    onClickClose () {
        this.props.showWfSelectModal(false)
    }
    onClickSave () {
        const { selectedRowWf } = this.props
        if (!selectedRowWf) return alert('Please choose workflow.')
        this.props.addDeviceTplWf(selectedRowWf)
        this.onClickClose()
    }
    onClickRow (wf) {
        this.props.selectWfRow(wf)
    }
    render () {
        const {
            workflows, selectedRowWf
        } = this.props

        return (
            <Modal
                show onHide={this.onHide.bind(this)}
                aria-labelledby="ModalHeader"
                className="bootstrap-dialog type-primary">
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Workflows
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>
                <div className="modal-body bootstrap-dialog-message">
                    <div style={{maxHeight: '400px', overflow: 'auto'}}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Severity</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Version</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                workflows.map(w =>
                                    <tr
                                        key={w.id}
                                        className={selectedRowWf && selectedRowWf.id === w.id ? 'selected' : ''}
                                        onClick={() => this.onClickRow(w)}
                                    >
                                        <td>{w.category}</td>
                                        <td>{w.severity}</td>
                                        <td>{w.name}</td>
                                        <td>{w.desc}</td>
                                        <td>{w.version}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right p-none">
                        <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>OK</a>
                        <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
                    </div>
                </div>
            </Modal>
        )
    }
}
