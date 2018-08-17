import React from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

import {Modal, CardPanel, FormInput, FormSelect} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

const FormTextArea = ({input, label, meta: {touched, error}, ...custom}) => (
  <textarea
    {...input}
    {...custom}
    placeholder={label}
  />
)

export default class ActionRegexModalView extends React.Component {
  render () {
    const {onClose, onSubmit, actions, onClickMatch, matchResult, loading} = this.props
    return (
      <Modal title="Action Regex" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Action Regex">
            <Field name="actionId" component={FormSelect} floatingLabel="Action"
                   options={actions.map(p => ({label: p.name, value: p.id}))} fullWidth/>

            <div className="flex-horizontal margin-md-top flex-vcenter">
              <div className="flex-1">
                <Field name="regex" component={FormInput} floatingLabel="Regex" fullWidth/>
              </div>
              <div className={matchResult ? '' : 'hidden'}>
                {matchResult === 'true' ? <CheckIcon nativeColor="green"/> : <CloseIcon nativeColor="red"/>}
              </div>
            </div>


            <div className="margin-md-top">Sample Text</div>
            <Field name="sampleText" component={FormTextArea} style={{height: 80, width: '100%'}}/>
          </CardPanel>
          <div className="form-buttons">
            <Button variant="raised" type="submit">Save</Button>
            <Button variant="raised" onClick={onClickMatch} className="margin-md-left">Test Match</Button>
          </div>
        </form>

        {loading && <RefreshOverlay/>}
      </Modal>
    )
  }
}