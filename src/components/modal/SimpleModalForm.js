import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, FormInput, FormSelect, FormImg, FileUpload,
  SubmitBlock } from './parts'

const SimpleModalForm = ({show, onHide, onSubmit, header, subheader,
  content, imageUpload, fileUpload}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name={header} onClick={onHide} />
    <div className="modal-body bootstrap-dialog-message">
    {(subheader) ? (<SubHeader name={subheader}/>) : null}
      <form onSubmit={onSubmit}>
        {(imageUpload) ? (<Field name="image" component={FormImg}/>) : null}
        {(fileUpload) ? (<Field name="files" component={FileUpload}/>) : null}
        <div className="form-column">
          {content.map(element => {
            switch (elem.type) {
              
            }
          }}
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="desc" component={FormInput} label="Description"
            multiLine rows={3}/>
          <Field name="select" component={FormSelect} label="Severity"
            options={options}/>
        </div>
        <SubmitBlock name="Submit" onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default SimpleModalForm
