import React from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'

import {Modal, CardPanel, SubmitBlock, FormInput, FormSelect} from 'components/modal/parts'

export default class ActionRegexModalView extends React.Component {
  render () {
    const {onClose, onSubmit, actions, realText, onChangeRealText, onClickMatch} = this.props
    return (
      <Modal title="Action Regex" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action Regex">
            <Field name="actionId" component={FormSelect} floatingLabel="Action"
                   options={actions.map(p => ({label: p.name, value: p.id}))} fullWidth/>
            <Field name="regex" component={FormInput} floatingLabel="Regex" className="margin-md-top" fullWidth/>


            <textarea value={realText} onChange={onChangeRealText} className="margin-md-top" style={{height: 80, width: '100%'}}></textarea>
          </CardPanel>
          <div className="form-buttons">
            <Button variant="raised" type="submit">Save</Button>
            <Button variant="raised" onClick={onClickMatch} className="margin-md-left">Test Match</Button>
          </div>
        </form>
      </Modal>
    )
  }
}