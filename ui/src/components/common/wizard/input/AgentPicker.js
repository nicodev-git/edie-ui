import React from 'react'
import {RadioButton} from 'material-ui'
import {Field} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'

import {FormSelect} from 'components/modal/parts'

export default class AgentPicker extends React.Component {
  render () {
    const {values, collectors} = this.props
    const {agent} = values

    const collectorOptions = collectors.map(p => ({
      label: p.name, value: p.id
    }))

    let agentLabel = 'Agent'
    if (!agent) {
      agentLabel = (
        <div>
          <div className="inline-block" style={{width: 100}}>Agent</div>
          <div className="inline-block" style={{textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.87)'}}>Install Agent</div>

        </div>
      )
    }

    const collectorLabel = (
      <div style={{width: 100}} className="inline-block">Collector</div>
    )

    return (
      <div style={{minHeight: 140}}>
        <Field name="agentType" component={RadioButtonGroup} className="margin-md-top">
          <RadioButton value="" label="None" className="pull-left"/>
          <RadioButton value="agent" label={agentLabel} className="pull-left" disabled={!agent} style={{marginTop: 14}}/>
          <RadioButton value="collector" label={collectorLabel} className="pull-left" style={{width: 120, marginTop: 14}}/>
        </Field>

        <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
      </div>
    )
  }
}
