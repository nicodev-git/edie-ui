import React, { Component } from 'react'
import { Field } from 'redux-form'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import {Chip, Tooltip} from '@material-ui/core'

import { FormInput, FormSelect, FormCheckbox, CardPanel } from 'components/modal/parts'
import { buttonStyle, chipStyles } from 'style/common/materialStyles'

import {severities} from 'shared/Global'

export default class WorkflowStep1 extends Component {
  renderParams () {
    const {editParams, onClickAddParam, onClickEditParam, onClickRemoveParam} = this.props

    return (
      <CardPanel title="Params">
        <div style={chipStyles.wrapper}>
          {editParams.map(p =>
            <Chip
              key={p.key}
              style={chipStyles.chip}
              onClick={() => onClickEditParam(p)}
              onDelete={() => onClickRemoveParam(p)}
              label={<span><b>{p.key}</b>: {p.value}</span>}
            />
          )}
          <Chip style={chipStyles.chip} onClick={onClickAddParam} label={<b>+</b>}/>
        </div>
      </CardPanel>
    )
  }
  render () {
    const {onClickRawData, tags, onClickAddTag, onClickDeleteTag, tagModal} = this.props
    return (
      <div className="wizard-step-1-container">
        <CardPanel title="Basic">
          <div>
            <div className="col-md-6 pl-none">
              <Field name="name" component={FormInput} label="Name" fullWidth/>
            </div>
            <div className="col-md-6 pr-none">
              <Field name="desc" component={FormInput} label="Description" fullWidth/>
            </div>
          </div>
          <Field name="severity" component={FormSelect} label="Severity" options={severities}/>
        </CardPanel>

        <CardPanel title="Description">
          <div className="margin-lg-bottom">
            <Chip style={chipStyles.smallChip}  onClick={onClickRawData} label="SHOW_RAW_DATA"/>
          </div>
          <div className="relative">
            <Field name="display_incident_desc" component={FormInput} label="Display Incident Description" style={{width: '100%'}}/>
            <div style={{position: 'absolute', right: 0, top: 0}}>
              <Tooltip title={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}>
                <IconButton style={buttonStyle}>
                  <HelpIcon nativeColor="#2196f3"/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </CardPanel>

        {this.renderParams()}

        <div className="margin-md-top">
          <Field name="enable" label="Enabled" component={FormCheckbox}/>
        </div>

        <CardPanel title="Tags">
          <div style={chipStyles.wrapper}>
            <Chip style={chipStyles.chip} onClick={onClickAddTag} label={<b>+</b>}/>
            {tags.map((t, i) =>
              <Chip key={i} style={chipStyles.chip} onDelete={() => onClickDeleteTag(i)} label={t}/>
            )}
          </div>
          {tagModal}
        </CardPanel>
      </div>
    )
  }
}
