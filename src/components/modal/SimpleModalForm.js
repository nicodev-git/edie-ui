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
    <Header name={header} />
    <div className="modal-body bootstrap-dialog-message">
    {(subheader) ? (<SubHeader name={subheader}/>) : null}
      <form onSubmit={onSubmit}>
        {(imageUpload) ? (<Field name="image" component={FormImg}/>) : null}
        {(fileUpload) ? (<Field name="file" component={FileUpload}/>) : null}
        <div className="form-column">
          {content.map(elem => {
            switch (elem.type) {
              case 'select':
                return (<Field
                  key={elem.name.replace(/\s+/g, '')}
                  name={elem.name.toLowerCase().replace(/\s+/g, '')}
                  component={FormSelect}
                  label={elem.name}
                  options={elem.options}/>)
              case 'password':
                return (<Field
                  key={elem.name.replace(/\s+/g, '')}
                  name={elem.name.toLowerCase().replace(/\s+/g, '')}
                  type="password"
                  component={FormInput}
                  label={elem.name}/>)
              default:
                return (<Field
                  key={elem.name.replace(/\s+/g, '')}
                  name={elem.name.toLowerCase().replace(/\s+/g, '')}
                  component={FormInput}
                  label={elem.name}/>)
            }
          })}
        </div>
        <SubmitBlock name={buttonText} onClick={onHide}/>
      </form>
    </div>
  </Modal>
)

export default SimpleModalForm
