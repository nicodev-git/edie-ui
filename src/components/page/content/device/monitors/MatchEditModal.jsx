import React from 'react'
import Modal from 'react-bootstrap-modal'

class MatchEditModal extends React.Component {
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
                        Match
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message p-none">
                    
                </div>
            </Modal>
        )
    }

    onHide() {
        this.onClickClose()
    }

    onClickClose() {
        this.setState({open: false}, () => {
            this.props.onClose &&
            this.props.onClose(this)
        })
    }
}

MatchEditModal.defaultProps = {
    onClose: null
}

export default MatchEditModal