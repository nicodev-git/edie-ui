import React, { Component } from 'react'
import { Field } from 'redux-form'
import IconButton from 'material-ui/IconButton'
import HelpIcon from 'material-ui/svg-icons/action/help'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { FormInput, FormSelect, FormCheckbox } from './parts'
import { buttonStyle, iconStyle } from 'style/materialStyles'

export default class WorkflowStep1 extends Component {
  render () {
    const {categories, onAddCategory, categoryModal} = this.props
    return (
      <div className="wizard-step-1-container">
        <div className="form-column wizard-step-1">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="desc" component={FormInput} label="Description"/>
          <Field name="display_incident_desc" component={FormInput} label="Display Incident Description"/>
          <Field name="category" component={FormSelect} label="Category"
            options={categories.map(c => ({value: c.name, label: c.name}))}/>
          <Field name="severity" component={FormSelect} label="Severity"
            options={[
              {value: 'HIGH', label: 'HIGH'},
              {value: 'MEDIUM', label: 'MEDIUM'},
              {value: 'LOW', label: 'LOW'},
              {value: 'AUDIT', label: 'AUDIT'},
              {value: 'IGNORE', label: 'IGNORE'},
              {value: 'IGNOREDELETE', label: 'IGNOREDELETE'},
              {value: 'DEVICE', label: 'DEVICE'}
            ]}/>
        </div>
        <div className="width-100">
          <Field name="enable" label="Enabled" component={FormCheckbox}/>
        </div>
        <div className="wizard-step-1-help"
          data-class="tt-workflow"
          data-tip={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}>
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
      </div>
    )
  }
}
