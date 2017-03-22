import React from 'react'
import Modal from 'react-bootstrap-modal'

class SysWorkflowsModal extends React.Component {
  componentWillMount () {
    this.props.fetchWorkflows()
  }

  onHide () {

  }

  render () {
    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            System Workflows
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message p-none">
          Workflows
        </div>
      </Modal>
    )
  }
}

export default SysWorkflowsModal
