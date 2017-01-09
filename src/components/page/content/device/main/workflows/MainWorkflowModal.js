import React from 'react'
import Modal from 'react-bootstrap-modal'

class MainWorkflowModal extends React.Component {
    render() {
        return (
            <Modal
                show={true}
                onHide={this.onHide.bind(this)}
                aria-labelledby="ModalHeader"
                className="bootstrap-dialog type-primary">
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Copy/Move Rules
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>
                <div className="modal-body bootstrap-dialog-message p-none">
                </div>
            </Modal>

        )
    }
}

export default MainWorkflowModal