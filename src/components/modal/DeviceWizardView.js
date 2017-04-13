import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, WizardButtons } from './parts'

export default class DeviceWizardView extends Component {
  render () {
    const {header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal} = this.props
    return (
      <Modal
        show
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary modal-device-wizard"
        style={{width: '740px'}}
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            {progressBar}
            <div className="form-column">
              {content}
            </div>
            <WizardButtons current={current} steps={steps} onClose={onHide}
              onPrev={onPrev} onNext={onNext}/>
          </form>
        </div>
        {paramEditModal}
      </Modal>
    )
  }
}
