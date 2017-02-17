import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Button
} from 'react-bootstrap'

class SimulationModal extends React.Component {

  onHide () {

  }

  onClickClose () {
    this.props.closeSimulationModal()
  }

  onClickSave () {

  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Simulation
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <label className="col-md-2 control-label">Text</label>
            <div className="col-md-10">
                  <textarea className="form-control" ref="text" style={{minHeight: '90px'}}/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-2 control-label">Filter 1</label>
            <div className="col-md-10">
              <input type="text" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-2 control-label">Filter 2</label>
            <div className="col-md-10">
              <input type="text" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-2 control-label">Parser</label>
            <div className="col-md-10">
              <input className="form-control"/>
            </div>
          </div>

          <div className="text-right">
            <Button className="btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>OK</Button>
            <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SimulationModal
