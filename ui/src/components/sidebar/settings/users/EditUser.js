import React from 'react'
import {findIndex, assign} from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {SelectField, MenuItem} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'
import { roleOptions } from 'shared/Global'
import {mainMenu} from 'components/sidebar/Config'
import { validate } from 'components/modal/validation/NameValidation'

class EditUser extends React.Component {
  componentWillMount () {
    this.props.closeSettingUserModal()

    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
  }
  componentDidUpdate (prevProps) {
    const {users, editUser, match} = this.props
    if (prevProps.users !== users && !editUser) {
      const index = findIndex(users, {username: match.params.user})
      if (index < 0) {
        this.props.history.push(`/settings/users`)
        return
      }
      this.props.openSettingUserModal(users[index])
    }
  }

  handleFormSubmit (values) {
    const { editUser, selectedRoles, selectedPermissions } = this.props
    const user = assign({}, editUser, values, {
      roles: selectedRoles,
      permissions: selectedPermissions
    })
    if (editUser) {
      this.props.updateSettingUser(user)
    } else {
      this.props.addSettingUser(user)
    }
  }

  onChangeRole (e, index, values) {
    this.props.selectUserRoles(values)
  }
  onChangePermission (e, index, values) {
    this.props.selectUserPermissions(values)
  }

  render () {
    const { handleSubmit, maps, selectedRoles, selectedPermissions, editUser } = this.props

    const defaultmaps = maps.map(p => ({label: p.name, value: p.id}))
    const roles = roleOptions
    const permissions = selectedPermissions
    if (!editUser) return <div>Loading...</div>
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <CardPanel title="User Settings" className="margin-md-bottom">
            <Field name="username" component={FormInput} label="Name" className="mr-dialog"/>
            <Field name="fullname" component={FormInput} label="Full Name"/>

            <Field name="password" type="password" component={FormInput} label="Password" className="mr-dialog"/>
            <Field name="email" component={FormInput} label="Email"/>

            <Field name="phone" component={FormInput} label="Phone" className="valign-top mr-dialog"/>
            <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="valign-top"/>

            <SelectField multiple hintText="Role" onChange={this.onChangeRole.bind(this)} value={selectedRoles}
                         className="mr-dialog">
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


            <SelectField multiple hintText="Permission" onChange={this.onChangePermission.bind(this)} value={permissions}>
              {mainMenu.map(p =>
                <MenuItem
                  key={p.id}
                  insetChildren
                  checked={permissions.includes(p.roleMenuId)}
                  value={p.roleMenuId}
                  primaryText={p.title}
                />
              )}
            </SelectField>

            <Field name="enabled" component={FormCheckbox} label="Enabled" />
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editUser,
    validate: validate
  })
)(reduxForm({form: 'userEditForm'})(EditUser))
