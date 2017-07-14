import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { WizardButtons } from 'components/modal/parts'

export default class DeviceWizardView extends Component {
  render () {
    const {header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal, credPicker} = this.props
    return (
      <Dialog open className="modal-device-wizard" title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          {progressBar}
          {content}
          <WizardButtons current={current} steps={steps} onClose={onHide}
            onPrev={onPrev} onNext={onNext}/>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}
