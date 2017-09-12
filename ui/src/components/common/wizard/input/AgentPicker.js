import React from 'react'
import {RadioButtonGroup} from 'redux-form-material-ui'

export default class AgentPicker extends React.Component {
  render () {
    let agentLabel = 'Agent'
    if (!agent) {
      agentLabel = (
        <div >
          <div className="inline-block" style={{width: 100}}>Agent</div>
          <div className="inline-block" style={{textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.87)'}}>Install Agent</div>
        </div>
      )
    }

    const collectorLabel = (
      <div style={{width: 100}} className="inline-block">Collector</div>
    )

    return (
      <div>
        <Field name="agentType" component={RadioButtonGroup} className="margin-md-top">
          <RadioButton value="agent" label={agentLabel} className="pull-left" disabled={!agent}/>
          <RadioButton value="collector" label={collectorLabel} className="pull-left" style={{width: 120, marginTop: 14}}/>
        </Field>
        <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
      </div>
    )
  }
}
