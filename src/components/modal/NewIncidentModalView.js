import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const MapSaveModalView = ({show, onHide, onSave, onClose}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Export Map" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message">
      <div className="row text-center margin-md-bottom">
        <div className="img-input" style={{width: '60px'}}>
          <img src={this.state.img}/>
          <input type="file" accept="image/*;capture=camera" onChange={this.onChangeFile.bind(this)} ref="file"/>
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="control-label col-md-3">Name</label>
        <div className="col-md-9">
          <input type="text" className="form-control" ref="name" />
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="control-label col-md-3">Description</label>
        <div className="col-md-9">
          <textarea className="form-control" ref="desc" />
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="control-label col-md-3 pt-none mb-none">Severity</label>
        <div className="col-md-9">
          <select ref="severity" className="form-control">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Audit</option>
          </select>
        </div>
      </div>

      <div className="text-center mb-none">
        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>Add</a>
        <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
      </div>
    </div>
  </Modal>
)

export default MapSaveModalView
