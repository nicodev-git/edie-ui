import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox } from './parts'

export default class WorkflowStep1 extends Component {
  render () {
    const {categories, onAddCategory, categoryModal} = this.props
    return (
      <div>
        <div className="form-column">
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
          <Field name="enable" label="Enabled" component={FormCheckbox}/>
        </div>
        <div className="row margin-md-bottom">
          <div className="col-md-1 text-right pl-none margin-sm-top">
            <a href="javascript:;">
              <i className="fa fa-question-circle fa-x"
                data-class="tt-workflow"
                data-tip={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}/>
            </a>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <div className="col-md-1 text-right pl-none margin-sm-top">
            <a href="javascript:;" onClick={onAddCategory}><i className="fa fa-plus-square fa-x"/></a>
          </div>
        </div>
        {categoryModal}
      </div>
    )
  }
}
