import React from 'react'
import Modal from 'react-bootstrap-modal'

import { Header, TwoButtonsBlockCustom } from './parts'

class SavedSearchModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose} = this.props
    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Saved Search" />
        <div className="modal-body bootstrap-dialog-message">
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}

export default SavedSearchModalView
