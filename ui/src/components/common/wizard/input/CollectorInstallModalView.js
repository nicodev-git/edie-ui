import React from 'react'
import { Field } from 'redux-form'

import { FormInput, FormSelect, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'

export default class CollectorInstallModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Collector Install" onRequestClose={onHide}>
        <Field name="user" component={FormInput} label="User"/>
        <Field name="password" component={FormInput} label="Password" type="password"/>
      </Modal>
    )
  }
}
