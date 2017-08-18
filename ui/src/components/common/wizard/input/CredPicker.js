import React from 'react'
import { Field } from 'redux-form'
import { RadioButtonGroup, RadioButton } from 'material-ui'
import {FormSelect} from 'components/modal/parts'

export default class CredPicker extends React.Component {
  render () {
    const {credentials} = this.props
    const options = credentials.map(p => ({label: p.name, value: p.id}))
    return (
      <div key="credentialId">

        <RadioButtonGroup name="credentialSelect" defaultSelected="new">
          <RadioButton value="new" label="New" style={{display: 'inline-block', width: 'auto'}}/>
          <RadioButton value="existing" label="Existing" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
        </RadioButtonGroup>

        <Field name="credentialId" component={FormSelect} className="valign-top mr-dialog" options={options}/>
      </div>
    )
  }
}
