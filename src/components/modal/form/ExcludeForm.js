import React from 'react'
import {Field} from 'redux-form'
import {Radio, RadioGroup, Select, MenuItem, TextField, FormControlLabel} from '@material-ui/core'
import {findIndex} from 'lodash'

import {
  FormInput, FormSelect,
  CardPanel
} from 'components/modal/parts'

const conditions = [{
  "label": "If Match Text",
  "value": "match"
}, {
  "label": "If Contains Text",
  "value": "contains"
}, {
  "label": "If Match Regex",
  "value": "matchRegex"
}]

export const variableOptions = 'count [Other]'.split(' ').map(p => ({
  label: p,
  value: p
}))

export default class ExcludeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldType: '',
      varName: '',
      existingVar: '[Other]'
    }
  }

  componentDidMount() {
    let {fieldType, varField} = this.props.initialValues
    fieldType = fieldType || 'message'

    const state = {
      fieldType
    }
    if (fieldType === 'variable') {
      if (findIndex(variableOptions, {value: varField}) >= 0) {
        state.existingVar = varField
      } else {
        state.existingVar = '[Other]'
      }
      if (state.existingVar === '[Other]') {
        state.varName = varField
      }
    }
    this.setState(state)
  }

  onChangeFieldType(e) {
    this.setState({
      fieldType: e.target.value
    })
    this.props.change('fieldType', e.target.value)
  }

  onChangeExistingVar(e) {
    this.setState({
      existingVar: e.target.value
    }, () => this.updateVarName())
  }

  onChangeVarName(e) {
    this.setState({
      varName: e.target.value
    }, () => this.updateVarName())
  }

  updateVarName() {
    const {existingVar, varName} = this.state
    this.props.change('varField', existingVar === '[Other]' ? varName : existingVar)
  }

  render() {
    const {keyFieldMode} = this.props
    if (keyFieldMode) {
      switch (keyFieldMode) {
        case 'field':
          return (
            <div className="padding-md">
              <Field name="field" component={FormInput} label="Field" style={{minWidth: 250}}/>
            </div>
          )
        case 'variable':
          return (
            <div className="padding-md">
              <TextField placeholder="Variable" className="valign-middle margin-md-right"
                         value={this.state.varName} onChange={this.onChangeVarName.bind(this)}
                         style={{minWidth: 250}}/>
            </div>
          )
        case 'condition':
          return (
            <div className="padding-md">
              <Field name="condition" component={FormSelect} label="Condition"
                     options={conditions} className="valign-top margin-md-right"
                     style={{minWidth: 250}}/>
            </div>
          )
        default:
          return (
            <div className="padding-md">
              <Field name="sentence" component={FormInput} label="Sentence" fullWidth style={{minWidth: 250}}/>
            </div>
          )
      }
    }

    return (
      <div>
        <CardPanel title="Basic">
          <Field name="name" component={FormInput} label="Name"
                 className="valign-top margin-md-right"/>
        </CardPanel>
        <CardPanel title="Type">
          <div className="relative">
            <RadioGroup
              name="fieldType"
              value={this.state.fieldType} onChange={this.onChangeFieldType.bind(this)}>
              <FormControlLabel
                value="message"
                label="Message"
                control={<Radio/>}
              />
              <FormControlLabel
                value="variable"
                label="Variable"
                control={<Radio/>}
              />
              <FormControlLabel
                value="field"
                label="Field"
                control={<Radio/>}
              />
            </RadioGroup>

            <div style={{position: 'absolute', left: 125, right: 0, bottom: 55}}>
              <div className="inline-block">
                <Select placeholder="Existing" className="valign-middle margin-md-right"
                        style={{width: 130}} value={this.state.existingVar}
                        onChange={this.onChangeExistingVar.bind(this)}>
                  {variableOptions.map(p =>
                    <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                  )}
                </Select>
              </div>
              <div className="inline-block">
                <TextField placeholder="Variable" className="valign-middle margin-md-right"
                           value={this.state.varName} onChange={this.onChangeVarName.bind(this)}
                           style={{width: 130}}/>
              </div>
            </div>

            <div style={{position: 'absolute', left: 125, right: 0, bottom: 7}}>
              <Field name="field" component={FormInput} label="Field"/>
            </div>
          </div>
          <div className="hidden">
            <Field name="fieldType" component={FormInput}/>
            <Field name="varField" component={FormInput}/>
          </div>
        </CardPanel>

        <CardPanel title="Match">
          <div>
            <Field name="condition" component={FormSelect} label="Condition"
                   options={conditions} className="valign-top margin-md-right"
                   style={{width: 180}}/>

            <Field name="sentence" component={FormInput} label="Sentence"
                   className="valign-top margin-md-right"
                   style={{width: 280}}/>
          </div>
        </CardPanel>

      </div>
    )
  }
}
