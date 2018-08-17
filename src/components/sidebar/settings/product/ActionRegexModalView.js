import React from 'react'
import {Field} from 'redux-form'
import {TextField} from '@material-ui/core'

import {Modal, CardPanel, SubmitBlock, FormInput, FormSelect} from 'components/modal/parts'

export default class ActionRegexModalView extends React.Component {
  render () {
    const {onClose, onSubmit, actions} = this.props
    return (
      <Modal title="Action Regex" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action Regex">
            <Field name="actionId" component={FormSelect} floatingLabel="Action"
                   options={actions.map(p => ({label: p.name, value: p.id}))} fullWidth/>
            <Field name="regex" component={FormInput} floatingLabel="Regex" className="margin-md-top" fullWidth/>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}