import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const AddIncidentModalView = ({show, onHide, onSave, onClose}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Add Incident" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message">
      <div className="row margin-md-bottom">
        <label className="col-md-3">Name:</label>
        <div className="col-md-9">
          <input type="text" className="form-control" ref="name"/>
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="col-md-3">Description:</label>
        <div className="col-md-9">
          <textarea className="form-control" style={{height: '150px'}} ref="desc" />
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="col-md-3">Severity:</label>
        <div className="col-md-9">
          <select className="form-control" ref="severity">
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="AUDIT">Audit</option>
          </select>
        </div>
      </div>
      <div className="text-right mb-none">
        <a href="javascript:;" className="btn btn-primary btn-sm"
          onClick={onSave}>Add Incident</a>
        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-left"
          onClick={onClose}>Cancel</a>
      </div>
    </div>
  </Modal>
)

export default AddIncidentModalView
