import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const MarkIgnoreModalView = ({show, onHide, onSave, onClose, text}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Mark as ignored" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message">
      <div className="row margin-md-bottom">
        <div className="col-md-12">
          <label className="control-label">{text}</label>
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="col-md-3 control-label">Severity</label>
        <div className="col-md-9">
          <select className="form-control" ref="severity">
            <option value="Ignore">Ignore</option>
            <option value="IgnoreDelete">Ignore Delete</option>
          </select>
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="col-md-3 control-label">Name</label>
        <div className="col-md-9">
          <input type="text" className="form-control" ref="name" />
        </div>
      </div>

      <div className="row margin-md-bottom">
        <div className="col-md-3">
          <label className="control-label margin-sm-top">Filter</label>
        </div>
        <div className="col-md-9">
          <input type="text" className="form-control" ref="filter"/>
        </div>
      </div>
      <div className="text-right mb-none">
        <a href="javascript:;" className="btn btn-primary btn-sm" onClick={onSave}>Save</a>
        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-left" onClick={onClose}>Cancel</a>
      </div>
    </div>
  </Modal>
)

export default MarkIgnoreModalView
