import React from 'react'
import {findIndex, assign, debounce} from 'lodash'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import {Checkbox, RaisedButton} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, CardPanel } from 'components/modal/parts'
import {rolePermissions} from 'shared/Permission'
import { validate } from 'components/modal/validation/NameValidation'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

class EditUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: null
    }

    this.debSave = debounce(this.submitForm.bind(this), 500)
  }
  componentWillMount () {
    this.props.closeSettingUserModal()

    this.props.fetchSettingUsers()
    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
    this.props.fetchRoles()
  }
  componentDidUpdate (prevProps) {
    const {users, editUser, match, formValues} = this.props
    if (users && users.length && prevProps.users !== users && !editUser) {
      const index = findIndex(users, {username: match.params.user})
      if (index < 0) {
        this.props.history.push(`/settings/users`)
        return
      }
      this.props.openSettingUserModal(users[index])
    }

    if (JSON.stringify(prevProps.formValues) !== JSON.stringify(formValues)) {
      console.log('Form Changed')
      this.debSave()
    }
  }

  submitForm () {
    this.handleFormSubmit(this.props.formValues)
  }

  handleFormSubmit (values) {
    const { editUser, selectedRoles, selectedPermissions } = this.props
    const user = assign({}, editUser, values, {
      roles: selectedRoles,
      permissions: selectedPermissions
    })
    this.props.updateSettingUser(user, true)
  }
  onCheckRole (role) {
    const value = role.name
    const checked = role.defaultChecked || []

    let {selectedRoles, selectedPermissions} = this.props
    if (selectedRoles.includes(value)) {
      selectedRoles = selectedRoles.filter(p => p !== value)
      selectedPermissions = selectedPermissions.filter(p => !checked.includes(p))
    } else {
      selectedRoles = [...selectedRoles, value]
      checked.forEach(p => {
        if (!selectedPermissions.includes(p)) selectedPermissions = [...selectedPermissions, p]
      })
    }
    this.props.selectUserRoles(selectedRoles)
    this.props.selectUserPermissions(selectedPermissions)
    this.debSave()
  }

  onCheckPermission (value) {
    let {selectedPermissions} = this.props
    const {selectedRole} = this.state
    if (!selectedRole) return
    if (selectedPermissions.includes(value)) {
      selectedPermissions = selectedPermissions.filter(p => p !== value)
    } else {
      selectedPermissions = [...selectedPermissions, value]
    }
    this.props.selectUserPermissions(selectedPermissions)
    this.debSave()
  }

  getSections () {
    const sections = []
    const {roles} = this.props
    roles.forEach(p => {
      if (sections.includes(p.section)) return
      sections.push(p.section)
    })
    return sections
  }

  render () {
    const {selectedRole} = this.state
    const { handleSubmit, maps, selectedRoles, selectedPermissions, editUser, roles } = this.props
    const sections = this.getSections()

    const defaultmaps = maps.map(p => ({label: p.name, value: p.id}))
    const permissions = selectedPermissions
    if (!editUser) return <div>Loading...</div>

    const items = []
    sections.forEach(s => {
      items.push(
        <tr key={s}>
          <td><b>{s}</b></td>
        </tr>
      )
      roles.filter(r => r.section === s).forEach(r =>
        items.push(
          <tr key={r.id}
              onClick={() => this.setState({selectedRole: r})}
              className={selectedRole && selectedRole.id === r.id ? 'selected' : ''}>
            <td>
              <div className="inline-block valign-middle">
                <Checkbox checked={selectedRoles.includes(r.name)} onCheck={this.onCheckRole.bind(this, r)}/>
              </div>
              <label className="valign-middle">{r.name}</label>
            </td>
          </tr>
        )
      )
    })

    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Edit User</span>
        </div>

        <TabPageBody tabs={[]} transparent>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div>
              <div className="col-md-12">
                <CardPanel title="User Settings" className="margin-md-bottom">
                  <Field name="username" component={FormInput} label="Name" className="mr-dialog"/>
                  <Field name="fullname" component={FormInput} label="Full Name" className="mr-dialog"/>

                  <Field name="password" type="password" component={FormInput} label="Password" className="mr-dialog"/>
                  <Field name="email" component={FormInput} label="Email" className="mr-dialog"/>

                  <Field name="phone" component={FormInput} label="Phone" className="valign-top mr-dialog"/>
                  <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="valign-top mr-dialog"/>

                  <Field name="enabled" component={FormCheckbox} label="Enabled" />
                </CardPanel>
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <CardPanel title="Roles">
                  <table className="table table-hover table-noborder">
                    <tbody>
                    {items}
                    </tbody>
                  </table>
                </CardPanel>

                <RaisedButton label="Show All" onTouchTap={() => this.setState({selectedRole: null})}
                              className="margin-md-top"/>

              </div>
              <div className="col-md-6">
                <CardPanel title="Permissions">
                  <div style={{height: 335, overflow: 'auto'}}>
                    <table className="table table-hover table-noborder">
                      <tbody>
                      {rolePermissions.map(p =>
                        <tr key={p}
                            className={!selectedRole || selectedRole.permissions.includes(p) ? '' : 'hidden'}>
                          <td>
                            <Checkbox label={p} checked={permissions.includes(p)}
                                      onCheck={this.onCheckPermission.bind(this, p)}
                            />
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                </CardPanel>
              </div>
            </div>
          </form>
        </TabPageBody>
      </TabPage>
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editUser,
    formValues: formValueSelector('userEditForm')(state,
      'username', 'fullname', 'password', 'email', 'phone', 'defaultMapId', 'enabled'),
    validate: validate
  })
)(reduxForm({form: 'userEditForm'})(EditUser))
