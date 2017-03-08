import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, FormInput, SubmitBlock } from './parts'

const MapSaveModalView = ({show, onHide, onSubmit}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Export Map" onClick={onHide}/>
    <div className="modal-body bootstrap-dialog-message">
      <form onSubmit={onSubmit}>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="description" component={FormInput} label="Description"/>
        </div>
        <SubmitBlock name="Save" onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default MapSaveModalView
