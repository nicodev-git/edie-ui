import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, FormInput, FormSelect, FormImg, SubmitBlock } from './parts'

const NewIncidentModalView = ({show, onHide, onSubmit, options}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="New Incident" onClick={onHide} />
    <div className="modal-body bootstrap-dialog-message">
      <form onSubmit={onSubmit}>
        <Field name="files" component={FormImg}/>
        <div className="form-column form-column-shift">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="desc" component={FormInput} label="Description"
            multiLine rows={3}/>
          <Field name="select" component={FormSelect} label="Severity"
            options={options}/>
        </div>
        <SubmitBlock onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default NewIncidentModalView
