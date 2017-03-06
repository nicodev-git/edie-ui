import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { Header, FormInput, FormSelect, FormImg } from './parts'

const NewIncidentModalView = ({show, onHide, onSubmit}) => (
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
        <Field name="name" component={FormInput} label="Enter Name"/>
        <Field name="desc" component={FormInput} label="Enter Description"
          multiLine rows={3}/>
        <Field name="select" component={FormSelect} label="Choose Severity">
          <MenuItem value={'High'} primaryText="High"/>
          <MenuItem value={'Medium'} primaryText="Medium"/>
          <MenuItem value={'Low'} primaryText="Low"/>
          <MenuItem value={'Audit'} primaryText="Audit"/>
        </Field>
        <div className="text-right">
          <button type="submit">Save</button>
          <button type="button" onClick={onHide}>Close</button>
        </div>
      </form>
    </div>
  </Modal>
)

export default NewIncidentModalView
