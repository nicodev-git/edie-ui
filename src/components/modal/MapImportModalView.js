import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, FileUpload, FormInput, SubmitBlock } from './parts'

const MapImportModalView = ({show, onHide, onSubmit}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Import Map" onClick={onHide} />

    <div className="modal-body bootstrap-dialog-message">
      <form onSubmit={onSubmit}>
        <Field name="files" component={FileUpload}/>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Name"/>
        </div>
        <SubmitBlock name="Submit" onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default MapImportModalView
