import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, SubmitBlock, ProfileImageUpload } from './parts'

export default class ProfileModalView extends Component {
  render () {
    const {show, imgSrc, onHide, onSubmit, onChangeImage} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Profile" />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <ProfileImageUpload src={imgSrc} onChange={onChangeImage} />
              <Field name="username" component={FormInput} label="User Name"/>
              <Field name="fullname" component={FormInput} label="Full Name"/>
              <Field name="password" component={FormInput} type="password" label="Password"/>
              <Field name="email" component={FormInput} label="Email"/>
              <Field name="phone" component={FormInput} label="Phose"/>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
