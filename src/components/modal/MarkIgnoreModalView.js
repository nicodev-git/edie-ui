import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, FormInput, FormSelect, SubmitBlock } from './parts'

const MarkIgnoreModalView = ({show, onHide, onSubmit, text, options}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Mark as ignored" onClick={onHide} />
    <div className="modal-body bootstrap-dialog-message">
      <SubHeader name={text}/>
      <form onSubmit={onSubmit}>
        <div className="form-column">
          <Field name="severity" component={FormSelect} label="Severity"
            options={options}/>
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="filter" component={FormInput} label="Filter"/>
        </div>
        <SubmitBlock name="Save" onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default MarkIgnoreModalView
