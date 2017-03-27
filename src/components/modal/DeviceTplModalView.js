import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubmitBlock, FormInput, FormSelect, ImageUploader } from './parts'

export default class DeviceTplModalView extends Component {
  render () {
    const {show, header, options, imgUrl, onSubmit, onHide, onChange} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="name" component={FormInput} label="Name"/>
              <Field name="devicetemplategroup" component={FormSelect} label="Group" options={options}/>
              <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
