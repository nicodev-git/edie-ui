import React from 'react'
import {Field} from 'redux-form'

import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ActionRegexModalView extends React.Component {
  render () {
    const {onClose, onSubmit} = this.props
    return (
      <Modal title="Action Regex" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action Regex">
            <Field name="action" component={FormInput} floatingLabel="Action" fullWidth/>
            <Field name="regex" component={FormInput} floatingLabel="Regex" fullWidth/>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}