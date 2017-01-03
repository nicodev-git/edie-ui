import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'

export default class LogMatchModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render () {
    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

          <div className="modal-header">
            <h4 className="modal-title bootstrap-dialog-title">
              Match
            </h4>
            <div className="bootstrap-dialog-close-button">
              <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
            </div>
          </div>

          <div className="modal-body bootstrap-dialog-message p-none">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Match List</h4>
                <div className="panel-options">
                  <a href="javascript:;" className="option trash">
                    <i className="fa fa-trash-o" />
                  </a>
                  <a href="javascript:showMatchEdit(false);" className="option add-device">
                    <i className="fa fa-plus-square" />
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <table className="table dataTable hover">
                  <thead>
                    <tr>
                      <th width="5%">Match</th>
                      <th width="5%">Ignore</th>
                      <th width="5%">Enabled</th>
                    </tr>
                  </thead>
                  <tbody />
                </table>
              </div>
            </div>
          </div>
      </Modal>
    )
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

  showMatchEdit () {

  }
}

LogMatchModal.defaultProps = {
  onClose: null
}
