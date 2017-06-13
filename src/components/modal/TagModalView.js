import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Field} from 'redux-form'

import {Header, FormInput, SubmitBlock} from './parts'

export default class TagModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal show onHide={() => {
      }} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="Tag" onClose={onClickClose}/>

        <div className="modal-body bootstrap-dialog-message pt-none">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="name" component={FormInput} type="text" floatingLabel="Name"/>
              <Field name="desc" component={FormInput} type="text" floatingLabel="Description"/>
              <Field name="order" component={FormInput} type="text" floatingLabel="Order"/>
            </div>
            <SubmitBlock name="Save" onCancel={onClickClose}/>
          </form>
        </div>
      </Modal>
    )
  }
}
