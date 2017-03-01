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
      <div className="row margin-md-bottom">
        <label className="control-label col-md-2 padding-sm-top">Name</label>
        <div className="col-md-10">
          <input type="text" className="form-control" ref="name" />
        </div>
      </div>

      <div className="row margin-md-bottom hidden">
        <label className="control-label col-md-3 padding-sm-top text-right">Description</label>
        <div className="col-md-9">
          <input type="text" className="form-control"/>
        </div>
      </div>

      <div className="text-right p-none">
        <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={onSave}>Save</a>
        <a href="javascript:;" className="btn btn-default btn-sm" onClick={onClose}>Cancel</a>
      </div>
    </div>
  </Modal>
)

export default MapSaveModalView
