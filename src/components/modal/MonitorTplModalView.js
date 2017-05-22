import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubmitBlock, FormInput, ImageUploader, FormCheckbox } from './parts'

export default class MonitorTplModalView extends Component {
  render () {
    const {show, header, imgUrl, onSubmit, onHide, onChange} = this.props
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
              <Field name="description" component={FormInput} label="Description"/>
              <Field name="monitortype" component={FormInput} label="Monitor type"/>
              <Field name="enabled" component={FormCheckbox} label="Enabled" labelPosition="right"/>
              <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
