import React, { Component } from 'react'
import {Form} from 'redux-form'
import {RaisedButton} from 'material-ui'

import { WizardButtons, Modal } from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class DeviceWizardView extends Component {
  render () {
    const {noModal, header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal, credPicker, collectorModal, addingDevice} = this.props
    if (noModal) {
      return (
        <div>
          {content}
          <div>
            <RaisedButton label="Save" onTouchTap={onNext}/>
          </div>
        </div>
      )
    }
    return (
      <Modal className="modal-device-wizard" title={header} onRequestClose={onHide} modal contentStyle={{width: 1035, maxWidth: 'initial'}}>
        <Form onSubmit={onSubmit}>
          {progressBar}
          <div style={{marginTop: -24}}>
            {content}
          </div>
          <WizardButtons current={current} steps={steps} onClose={onHide}
            onPrev={onPrev} onNext={onNext}/>
        </Form>
        {paramEditModal}
        {credPicker}
        {collectorModal}
        {addingDevice && <RefreshOverlay/>}
      </Modal>
    )
  }
}
