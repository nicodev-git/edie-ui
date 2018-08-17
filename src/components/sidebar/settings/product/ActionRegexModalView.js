import React from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'

import {Modal, CardPanel, FormInput, FormSelect} from 'components/modal/parts'

export default class ActionRegexModalView extends React.Component {
  render () {
    const {onClose, onSubmit, actions, realText, onChangeRealText, onClickMatch, matchResult} = this.props
    return (
      <Modal title="Action Regex" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action Regex">
            <Field name="actionId" component={FormSelect} floatingLabel="Action"
                   options={actions.map(p => ({label: p.name, value: p.id}))} fullWidth/>

            <div className="flex-horizontal margin-md-top">
              <div className="flex-1">
                <Field name="regex" component={FormInput} floatingLabel="Regex" fullWidth/>
              </div>
              <div className={matchResult ? '' : 'hidden'}>
                {matchResult}
              </div>
            </div>


            <div className="margin-md-top">Sample Text</div>
            <textarea value={realText} onChange={onChangeRealText} style={{height: 80, width: '100%'}}></textarea>
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