import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Field} from 'redux-form'

import {Header, FormInput, SubmitBlock} from './parts'

class PatternModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal show onHide={() => {
      }} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <Header name="Pattern" onClose={onClickClose}/>

        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="text" component={FormInput} type="text" label="Pattern" multiLine/>
            </div>
            <SubmitBlock name="Save" onClick={onClickClose}/>
          </form>
        </div>
      </Modal>
    )
  }
}

export default PatternModalView
