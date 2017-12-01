import React from 'react'
import {findIndex, assign} from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {SelectField, MenuItem, Checkbox} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, CardPanel } from 'components/modal/parts'
import { roleOptions } from 'shared/Global'
import {mainMenu} from 'components/sidebar/Config'
import { validate } from 'components/modal/validation/NameValidation'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

class EditUser extends React.Component {
  componentWillMount () {
    this.props.closeSettingUserModal()

    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
  }
  componentDidUpdate (prevProps) {
    const {users, editUser, match} = this.props
    if (users && users.length && prevProps.users !== users && !editUser) {
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
  onCheckRole (value) {
    //
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
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Edit User</span>
        </div>

        <TabPageBody tabs={[]} transparent>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <CardPanel title="User Settings" className="margin-md-bottom">
              <Field name="username" component={FormInput} label="Name" className="mr-dialog"/>
              <Field name="fullname" component={FormInput} label="Full Name" className="mr-dialog"/>

              <Field name="password" type="password" component={FormInput} label="Password" className="mr-dialog"/>
              <Field name="email" component={FormInput} label="Email" className="mr-dialog"/>

              <Field name="phone" component={FormInput} label="Phone" className="valign-top mr-dialog"/>
              <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="valign-top mr-dialog"/>


              <div className="hidden">
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
              </div>

              <Field name="enabled" component={FormCheckbox} label="Enabled" />
            </CardPanel>

            <div className="row">
              <div className="col-md-6">
                <CardPanel title="Roles">
                  <table className="table table-hover">
                    <tbody>
                    {roles.map(option =>
                      <tr key={option.value}>
                        <td>
                          <Checkbox label={option.label} checked={selectedRoles.includes(option.value)}
                                    onCheck={this.onCheckRole.bind(this, option.value)}/>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </CardPanel>
              </div>
              <div className="col-md-6">
                <CardPanel title="Permissions">
                </CardPanel>
              </div>
            </div>
            <SubmitBlock name="Save"/>
          </form>
        </TabPageBody>
      </TabPage>
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editUser,
    validate: validate
  })
)(reduxForm({form: 'userEditForm'})(EditUser))
