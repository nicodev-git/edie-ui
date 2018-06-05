import React, { Component } from 'react'
import {Form} from 'redux-form'
import {Button} from '@material-ui/core'

import { WizardButtons, Modal } from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

const fixedBarStyle = {
  position: 'fixed',
  bottom: 0,
  background: '#e6e8ed',
  left: 0,
  right: 0,
  borderTop: '1px solid lightgray',
  zIndex: 10,
  padding: '13px 20px 20px 0'
}

export default class DeviceWizardView extends Component {
  render () {
    const {noModal, header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal, credPicker, collectorModal, addingDevice} = this.props
    if (noModal) {
      return (
        <div>
          <Form onSubmit={onSubmit}>
            {content}
            <div style={fixedBarStyle} className="text-right">
              <Button variant="raised" type="submit">
                Save
              </Button>
            </div>
            <div style={{height: 140, width: '100%'}} className="pull-left">&nbsp;</div>
          </Form>

          {paramEditModal}
          {credPicker}
          {collectorModal}
          {addingDevice && <RefreshOverlay/>}
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
