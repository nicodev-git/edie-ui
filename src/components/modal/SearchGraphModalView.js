import React from 'react'
import Modal from 'react-bootstrap-modal'
import {FlatButton} from 'material-ui'

import {Header} from './parts'

export default class SearchGraphModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="Graph"/>
        <div className="modal-body bootstrap-dialog-message">

          <div className="form-buttons">
            <FlatButton label="Close" onClick={onHide}/>
          </div>
        </div>
      </Modal>
    )
  }
}
