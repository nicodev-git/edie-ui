import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Button
} from 'react-bootstrap'

class ParserPatternModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.onClose()
  }

  onClickSave () {
    const pattern = this.refs.pattern.value
    this.props.onClose(pattern)
  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Parser Type
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <label className="col-md-3">Pattern</label>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="pattern" defaultValue={this.props.editPattern}/>
            </div>
          </div>

          <div className="text-right">
            <Button className="btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>Save</Button>
            <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

ParserPatternModal.defaultProps = {
  onClose: null,
  editPattern: ''
}

export default ParserPatternModal
