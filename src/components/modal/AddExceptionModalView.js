import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const AddExceptionModalView = ({show, onHide, onSubmit, text}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Add Exception" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message">
    <div className="row margin-md-bottom">
      <div className="col-md-12">
        <label className="control-label">{text}</label>
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
      <a href="javascript:;" className="btn btn-primary btn-sm" onClick={onSave}>Save</a>
      <a href="javascript:;" className="btn btn-default btn-sm" onClick={onClose}>Cancel</a>
    </div>
    </div>
  </Modal>
)

export default AddExceptionModalView
