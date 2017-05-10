import React, { Component } from 'react'
import { Field } from 'redux-form'
import IconButton from 'material-ui/IconButton'
import HelpIcon from 'material-ui/svg-icons/action/help'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {Chip} from 'material-ui'
import ReactTooltip from 'react-tooltip'

import { FormInput, FormSelect, FormCheckbox } from './parts'
import { buttonStyle, iconStyle, chipStyles } from 'style/materialStyles'

import {severities} from 'shared/Global'

export default class WorkflowStep1 extends Component {
  render () {
    const {categories, onAddCategory, categoryModal, onClickRawData} = this.props
    return (
      <div className="wizard-step-1-container">
        <div className="form-column wizard-step-1">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="desc" component={FormInput} label="Description"/>
          <div>
            <Chip style={chipStyles.chip} onTouchTap={onClickRawData}>
              SHOW_RAW_DATA
            </Chip>
          </div>
          <Field name="display_incident_desc" component={FormInput} label="Display Incident Description"/>
          <Field name="category" component={FormSelect} label="Category" options={categories.map(c => ({value: c.name, label: c.name}))}/>
          <Field name="severity" component={FormSelect} label="Severity" options={severities}/>
        </div>
        <div className="width-100">
          <Field name="enable" label="Enabled" component={FormCheckbox}/>
        </div>
        <div className="wizard-step-1-help" data-class="tt-workflow" data-tip={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}>
          <IconButton
            style={buttonStyle}
            iconStyle={iconStyle}>
            <HelpIcon color="#2196f3"/>
          </IconButton>
        </div>
        <div className="wizard-step-1-add">
          <IconButton
            style={buttonStyle}
            iconStyle={iconStyle}
            onTouchTap={onAddCategory}>
            <AddCircleIcon color="#8bc34a"/>
          </IconButton>
        </div>
        {categoryModal}
        <ReactTooltip />
      </div>
    )
  }
}
