import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, FormInput, SubmitBlock } from './parts'

const AddExceptionModalView = ({show, onHide, onSubmit, text}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Add Exception" onClick={onHide} />
    <div className="modal-body bootstrap-dialog-message">
      <SubHeader name={text}/>
      <form onSubmit={onSubmit}>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Filter"/>
        </div>
        <SubmitBlock name="Save" onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default AddExceptionModalView
