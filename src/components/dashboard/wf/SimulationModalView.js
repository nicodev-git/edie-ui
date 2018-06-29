import React from 'react'
import {Field} from 'redux-form'
import {Dialog} from '@material-ui/core'

import {
  FormInput,
  FormSelect,
  SubmitBlock
} from 'components/modal/parts'


export default class SimulationModalView extends React.Component {
  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Dialog open title="Simulation">
        <form onSubmit={onSubmit}>
          <div>
            <Field name="text"
                   component={FormInput}
                   floatingLabel="Text"
                   className="valign-top margin-md-right"
                   fullWidth
            />
          </div>

          <div>
            <Field name="ip"
                   component={FormInput}
                   floatingLabel="IP"
                   className="valign-top margin-md-right"
                   style={{width: 150}}
            />

            <Field name="channel"
                   component={FormInput}
                   floatingLabel="Channel"
                   className="valign-top margin-md-right"
                   style={{width: 150}}
            />

          </div>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}