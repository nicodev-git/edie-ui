import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip} from 'material-ui'

import { FormInput, FormSelect, FormCheckbox } from './parts'
import { chipStyles } from 'style/materialStyles'

export default class WorkflowStep1 extends Component {
  render () {
    const {categories, categoryModal, onClickRawData} = this.props
    return (
      <div>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="desc" component={FormInput} label="Description"/>
          <div>
            <Chip style={chipStyles.chip}
              onTouchTap={onClickRawData}>
              SHOW_RAW_DATA
            </Chip>
          </div>
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
        {categoryModal}
      </div>
    )
  }
}
