import React from 'react'
import {Form} from 'redux-form'
import { WizardButtons, Modal } from 'components/modal/parts'

export default class DeviceEditModalView extends React.Component {
  render () {
    const {header, progressBar, content, current, steps, onSubmit, onHide,
      onPrev, onNext, paramEditModal, credPicker} = this.props
    return (
      <Modal className="modal-device-wizard" title={header} onRequestClose={onHide} contentStyle={{width: 1035, maxWidth: 'initial'}}>

      </Modal>
    )
  }
}
