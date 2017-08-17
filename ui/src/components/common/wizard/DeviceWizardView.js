import React, { Component } from 'react'
import { WizardButtons, Modal, CardPanel } from 'components/modal/parts'

export default class DeviceWizardView extends Component {
  render () {
    const {header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal, credPicker} = this.props
    return (
      <Modal className="modal-device-wizard" title={header} onRequestClose={onHide}>
          <form onSubmit={onSubmit}>
            <CardPanel className="margin-md-bottom">
              {progressBar}
              {content}
            </CardPanel>
            <WizardButtons current={current} steps={steps} onClose={onHide}
              onPrev={onPrev} onNext={onNext}/>
          </form>
          {paramEditModal}
          {credPicker}
      </Modal>
    )
  }
}
