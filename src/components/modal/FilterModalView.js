import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Field} from 'redux-form'

import {Header, FormInput, SubmitBlock} from './parts'

class FilterModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal show onHide={() => {
      }} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <Header name="Filter" onClose={onClickClose}/>

        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="text" component={FormInput} type="text" label="Filter"/>
            </div>
            <SubmitBlock name="Save" onClick={onClickClose}/>
          </form>
        </div>
      </Modal>
    )
  }
}

export default FilterModalView
