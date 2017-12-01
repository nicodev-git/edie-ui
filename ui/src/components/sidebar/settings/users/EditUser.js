import React from 'react'
import {findIndex, assign} from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {Checkbox} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, CardPanel } from 'components/modal/parts'
import {mainMenu} from 'components/sidebar/Config'
import { validate } from 'components/modal/validation/NameValidation'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

class EditUser extends React.Component {
  componentWillMount () {
    this.props.closeSettingUserModal()

    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
    this.props.fetchRoles()
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
    this.props.history.push(`/settings/users`)
  }
  onCheckRole (value) {
    let {selectedRoles} = this.props
    if (selectedRoles.includes(value)) {
      selectedRoles = selectedRoles.filter(p => p !== value)
    } else {
      selectedRoles = [...selectedRoles, value]
    }
    this.props.selectUserRoles(selectedRoles)
  }
  onChangeRole (e, index, values) {
    this.props.selectUserRoles(values)
  }

  onCheckPermission (value) {
    let {selectedPermissions} = this.props
    if (selectedPermissions.includes(value)) {
      selectedPermissions = selectedPermissions.filter(p => p !== value)
    } else {
      selectedPermissions = [...selectedPermissions, value]
    }
    this.props.selectUserPermissions(selectedPermissions)
  }
  onChangePermission (e, index, values) {
    this.props.selectUserPermissions(values)
  }

  render () {
    const { handleSubmit, maps, selectedRoles, selectedPermissions, editUser, roles } = this.props

    const defaultmaps = maps.map(p => ({label: p.name, value: p.id}))
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

              <Field name="enabled" component={FormCheckbox} label="Enabled" />
            </CardPanel>

            <div className="row">
              <div className="col-md-6">
                <CardPanel title="Roles">
                  <table className="table table-hover">
                    <tbody>
                    {roles.map(r =>
                      <tr key={r.id}>
                        <td>
                          <Checkbox label={r.name} checked={selectedRoles.includes(r.name)}
                                    onCheck={this.onCheckRole.bind(this, r.name)}/>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </CardPanel>
              </div>
              <div className="col-md-6">
                <CardPanel title="Permissions">
                  <table className="table table-hover">
                    <tbody>
                    {mainMenu.map(p =>
                      <tr key={p.id}>
                        <td>
                          <Checkbox label={p.title} checked={permissions.includes(p.roleMenuId)}
                                    onCheck={this.onCheckPermission.bind(this, p.roleMenuId)}/>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
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
