import React from 'react'
import Modal from 'react-bootstrap-modal'

export default class AddExceptionModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(success)
    })
  }

  onClickClose () {
    this.onHide()
  }

  render () {
    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Add Exception
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <div className="col-md-12">
              <label className="control-label">{this.props.incident.rawtext}</label>
            </div>
          </div>
          <div className="row margin-md-bottom">
            <div className="col-md-2">
              <label className="control-label margin-sm-top">Filter</label>
            </div>
            <div className="col-md-10">
              <input type="text" className="form-control"/>
            </div>
          </div>
          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-primary btn-sm" onClick={this.onClickClose.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

AddExceptionModal.defaultProps = {
  open: false,

  incident: {},
  onClose: null
}
