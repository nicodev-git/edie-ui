import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Field} from 'redux-form'

import {Header, FormInput, SubmitBlock} from './parts'

export default class LocalUserModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <Header name="User" onClose={onClickClose}/>

        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="username" component={FormInput} type="text" label="User"/>
              <Field name="userpassword" component={FormInput} type="password" label="Passowrd"/>
            </div>
            <SubmitBlock name="OK" onClick={onClickClose}/>
          </form>
        </div>
      </Modal>
    )
  }
}
