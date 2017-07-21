import React from 'react'

import {Dialog, SelectField, MenuItem} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock } from 'components/modal/parts'

export default class UserModalView extends React.Component {
  render () {
    const {onHide, onSubmit, defaultmaps, roles, selectedRoles, onChangeRole} = this.props
    return (
      <Dialog open title="User" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="username" component={FormInput} label="Name"/>
            <Field name="fullname" component={FormInput} label="Full Name"/>
            <Field name="password" type="password" component={FormInput} label="Password"/>
            <Field name="email" component={FormInput} label="Email"/>
            <Field name="phone" component={FormInput} label="Phone"/>
            <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps}/>
            <Field name="role" component={FormSelect} label="Role" options={roles}/>
            <SelectField multiple hintText="Role" onChange={onChangeRole}>
              {roles.map(option =>
                <MenuItem
                  key={option.value}
                  insetChildren
                  checked={selectedRoles.includes(option.value)}
                  value={option.value}
                  primaryText={option.label}
                />
              )}
            </SelectField>

            <Field name="enabled" component={FormCheckbox} label="Enabled" />
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
