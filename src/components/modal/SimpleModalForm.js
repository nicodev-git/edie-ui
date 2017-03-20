import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, FormInput, FormSelect, FormImg, FileUpload,
  SubmitBlock } from './parts'

const SimpleModalForm = ({show, onHide, onSubmit, header, subheader, buttonText,
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
        {(fileUpload) ? (<Field name="file" component={FileUpload}/>) : null}
        <div className="form-column">
          {content.map(elem => {
            switch (elem.type) {
              case 'select':
                return (<Field key={elem.name} name={elem.name.toLowerCase()}
                  component={FormSelect} label={elem.name} options={elem.options}/>)
              default:
                return (<Field key={elem.name} name={elem.name.toLowerCase()}
                  component={FormInput} label={elem.name}/>)
            }
          })}
        </div>
        <SubmitBlock name={buttonText} onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default SimpleModalForm
