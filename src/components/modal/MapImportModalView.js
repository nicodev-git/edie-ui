import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const MapImportModalView = ({show, onHide, onChange, onImport, onClose, fileName}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Import Map" onClick={onClose} />

    <div className="modal-body bootstrap-dialog-message">
      <div className="row margin-md-bottom">
        <label className="control-label col-md-3 padding-sm-top text-right">File: </label>
        <div className="col-md-8 padding-sm-top">

          <a href="javascript:;" style={{position: 'relative', cursor: 'pointer'}}>
            Choose File
            <input
              type="file"
              name="file"
              ref="file"
              onChange={onChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0,
                fontSize: '20px',
                cursor: 'pointer',
                opacity: 0
              }}
            />
          </a>
          <span className="margin-md-left">{fileName}</span>
        </div>
      </div>

      <div className="row margin-md-bottom">
        <label className="control-label col-md-3 padding-sm-top text-right">Name:</label>
        <div className="col-md-8">
          <input type="text" className="form-control" ref="name"/>
        </div>
      </div>

      <div className="text-center mb-none">
        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
          onClick={onImport}>Import</a>
        <a href="javascript:;" className="btn btn-default btn-sm"
          onClick={onClose}>Cancel</a>
      </div>
    </div>
  </Modal>
)

export default MapImportModalView
