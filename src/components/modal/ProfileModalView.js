import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubmitBlock, ProfileImageUpload, FormInput, FormSelect, CheckboxItem } from './parts'

export default class ProfileModalView extends Component {
  render () {
    const {show, imgSrc, onHide, onSubmit, onChangeImage, mapOptions, roleOptions,
      defaultChecked, checkboxLabel} = this.props
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
            <ProfileImageUpload imgSrc={imgSrc} onChangeImage={onChangeImage} />
            <div className="form-column">
              <Field name="username" component={FormInput} label="User Name"/>
              <Field name="fullname" component={FormInput} label="Full Name"/>
              <Field name="password" component={FormInput} type="password" label="Password"/>
              <Field name="email" component={FormInput} label="Email"/>
              <Field name="phone" component={FormInput} label="Phone"/>
              <Field name="map" component={FormSelect} label="Default Map" options={mapOptions}/>
              <Field name="role" component={FormSelect} label="Role" options={roleOptions}/>
              <CheckboxItem label={checkboxLabel} disabled defaultChecked={defaultChecked}/>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
