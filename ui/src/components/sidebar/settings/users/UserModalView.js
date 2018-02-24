import React from 'react'

import {Select, MenuItem} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'

export default class UserModalView extends React.Component {
  render () {
    const {onHide, onSubmit, defaultmaps, roles, selectedRoles, onChangeRole,
      permissions, onChangePermission, mainMenu} = this.props
    return (
      <Modal title="User" onRequestClose={onHide} contentStyle={{width: 685}}>
        <form onSubmit={onSubmit}>
          <CardPanel title="User Settings" className="margin-md-bottom">
            <Field name="username" component={FormInput} label="Name" className="mr-dialog"/>
            <Field name="fullname" component={FormInput} label="Full Name"/>

            <Field name="password" type="password" component={FormInput} label="Password" className="mr-dialog"/>
            <Field name="email" component={FormInput} label="Email"/>

            <Field name="phone" component={FormInput} label="Phone" className="valign-top mr-dialog"/>
            <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="valign-top"/>

            <Select multiple label="Role" onChange={onChangeRole} value={selectedRoles}
              className="mr-dialog">
              {roles.map(r =>
                <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>
              )}
            </Select>


            <Select multiple label="Permission" onChange={onChangePermission} value={permissions}>
              {mainMenu.map(p =>
                <MenuItem key={p.id} value={p.roleMenuId}>{p.title}</MenuItem>
              )}
            </Select>

            <Field name="enabled" component={FormCheckbox} label="Enabled" />
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
