import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { WizardButtons } from './parts'

export default class DeviceWizardView extends Component {
  render () {
    const {header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal} = this.props
    return (
      <Dialog open className="modal-device-wizard" title={header}>
        <form onSubmit={onSubmit}>
          {progressBar}
          <div className="form-column">
            {content}
          </div>
          <WizardButtons current={current} steps={steps} onClose={onHide}
            onPrev={onPrev} onNext={onNext}/>
        </form>
        {paramEditModal}
      </Dialog>
    )
  }
}
