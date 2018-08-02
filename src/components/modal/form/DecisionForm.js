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
  "value": "If Match Text"
}, {
  "label": "If Contains Text",
  "value": "contains"
}, {
  "label": "If Older Than",
  "value": "olderThan"
}, {
  "label": "If Match Regex",
  "value": "matchRegex"
}, {
  "label": "If Greater Than",
  "value": "greaterThan"
}]

const gotoOptions = [{
  "label": "Go to start",
  "value": "start"
}, {
  "label": "Continue",
  "value": "continue"
}, {
  "label": "Finish",
  "value": "finish"
}]

const labelStyle = {
  fontSize: 16,
  marginTop: 4,
  verticalAlign: 'middle',
  display: 'inline-block',
  marginRight: 16
}

export const variableOptions = 'count [Other]'.split(' ').map(p => ({
  label: p,
  value: p
}))

class DecisionForm extends React.Component {
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

  renderVarField (style) {
    return (
      <div style={style}>
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
    )
  }

  renderField (style, fullWidth) {
    return (
      <div style={style}>
        <Field name="field" component={FormInput} label="Field" fullWidth={fullWidth}/>
      </div>
    )
  }

  render() {
    const {keyFieldMode} = this.props
    if (keyFieldMode) {
      return (
        <Field name="sentence" component={FormInput} label="Sentence" fullWidth style={{minWidth: 250}}/>
      )
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

            {this.renderVarField({position: 'absolute', left: 125, right: 0, bottom: 55})}
            {this.renderField({position: 'absolute', left: 125, right: 0, bottom: 7})}

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
                   style={{width: 150}}/>

            <label style={labelStyle}> then set parameter </label>
            <Field name="variable" component={FormInput} label="Variable"
                   className="valign-top margin-md-right"
                   style={{width: 150}}/>

            <label style={labelStyle}> with value </label>

            <Field name="response" component={FormInput} label="Response"
                   className="valign-top margin-md-right"
                   style={{width: 150}}/>
          </div>
          <div className="margin-md-top">
            <label style={labelStyle}>If not match</label>
            <Field name="gotoIfFalse" component={FormSelect} options={gotoOptions}
                   className="valign-top margin-md-right"/>
          </div>
        </CardPanel>

      </div>
    )
  }
}

export default DecisionForm