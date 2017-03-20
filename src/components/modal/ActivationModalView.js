import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, FormInput, SubmitSingle } from './parts'

const ActivationModalView = ({onHide, onSignup}) => (
  <Modal
    show
    onHide={onHide}
    className="bootstrap-dialog type-primary modal-w-wrap">
    <div>
      <Header name="License Activation"/>
      <div style={{background: '#d9d9dc', minWidth: '300px'}} className="padding-md">
        <form onSubmit={onSignup}>
          <div className="form-column">
            <Field name="email" component={FormInput} autoComplete="off" label="Email"/>
            <Field name="license" component={FormInput} autoComplete="off" label="License"/>
          </div>
          <SubmitSingle name="Activate"/>
        </form>
      </div>
    </div>
  </Modal>
)

export default ActivationModalView
