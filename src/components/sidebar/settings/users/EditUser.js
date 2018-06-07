import React from 'react'
import {findIndex, debounce} from 'lodash'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { FormControlLabel } from '@material-ui/core'

import {Checkbox, Button} from '@material-ui/core'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, CardPanel } from 'components/modal/parts'
import {hasPermission} from 'shared/Permission'
import { validate } from 'components/modal/validation/NameValidation'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

class EditUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: null,
      checkedSections: [],
      opening: false
    }

    this.debSave = debounce(this.submitForm.bind(this), 500)
  }
  componentWillMount () {
    this.props.closeSettingUserModal()

    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
    this.props.fetchRoles()
    this.props.fetchPermissions()
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
      this.setState({opening: true})
    }

    if (!this.state.opening && JSON.stringify(prevProps.formValues) !== JSON.stringify(formValues)) {
      console.log('Form Changed')
      this.debSave()
      this.setState({opening: false})
    }
  }

  submitForm () {
    if (!this.checkCanEdit()) return
    this.handleFormSubmit(this.props.formValues)
  }

  handleFormSubmit (values) {
    const { editUser, roles, permissions, selectedRoles, selectedPermissions } = this.props
    const user = ({
      ...editUser,
      ...values,
      roles: roles.filter(p => selectedRoles.includes(p.id)),
      permissions: permissions.filter(p => selectedPermissions.includes(p.id))
    })
    console.log(user)
    this.props.updateSettingUser(user, true)
  }
  onCheckRole (role) {
    const value = role.id

    let {selectedRoles} = this.props
    if (selectedRoles.includes(value)) {
      selectedRoles = selectedRoles.filter(p => p !== value)
    } else {
      selectedRoles = [...selectedRoles, value]
    }
    this.props.selectUserRoles(selectedRoles)
    this.debSave()
  }

  onCheckSection (section, e, checked) {
    const {checkedSections} = this.state
    if (checked) {
      if (!checkedSections.includes(section)) {
        this.setState({
          checkedSections: [...checkedSections, section]
        })
      }
    } else {
      this.setState({
        checkedSections: checkedSections.filter(p => p !== section)
      })


      const {selectedRoles, roles} = this.props
      const filteredRoles =roles.filter(r => r.section === section)
      filteredRoles.forEach(r => {
        if (selectedRoles.includes(r.name)) {
          this.onCheckRole(r)
        }
      })
    }
  }

  onCheckPermission (value) {
    let {selectedPermissions} = this.props
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
    // const {roles} = this.props
    // roles.forEach(p => {
    //   if (sections.includes(p.section)) return
    //   sections.push(p.section)
    // })
    return sections
  }

  checkCanEdit () {
    const canEdit = hasPermission(this.props.user, 'EditSettings')
    return canEdit
  }

  renderRoles2 (canEdit) {
    const {selectedRole, checkedSections} = this.state
    const { selectedRoles, roles } = this.props
    const sections = this.getSections()

    const items = []
    sections.forEach(s => {
      const filteredRoles = roles.filter(r => r.section === s)
      const checked = checkedSections.includes(s) || filteredRoles.filter(r => selectedRoles.includes(r.name)).length > 0
      items.push(
        <tr key={s}>
          <td>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={canEdit ? this.onCheckSection.bind(this, s) : null}/>
              }
              label={s}
            />
          </td>
        </tr>
      )
      filteredRoles.forEach(r =>
        items.push(
          <tr key={r.id}
              onClick={() => this.setState({selectedRole: r})}
              className={selectedRole && selectedRole.id === r.id ? 'selected' : ''}>
            <td className="padding-lg-left">
              <div className="inline-block valign-middle">
                <Checkbox checked={selectedRoles.includes(r.name)} onChange={canEdit ? this.onCheckRole.bind(this, r) : null}/>
              </div>
              <label className="valign-middle">{r.name}</label>
            </td>
          </tr>
        )
      )
    })

    return (
      <CardPanel title="Roles">
        <div style={{height: 335, overflow: 'auto'}} className="relative">
          <table className="table table-hover table-noborder table-pt-none table-pb-none">
            <tbody>
            {items}
            </tbody>
          </table>
        </div>

      </CardPanel>
    )
  }

  renderRoles (canEdit) {
    const {selectedRole} = this.state
    const { selectedRoles, roles } = this.props

    const items = roles.map(r =>
      <tr key={r.id}
          onClick={() => this.setState({selectedRole: r})}
          className={selectedRole && selectedRole.id === r.id ? 'selected' : ''}>
        <td>
          <div className="inline-block valign-middle">
            <Checkbox checked={selectedRoles.includes(r.id)}
                      onChange={canEdit ? this.onCheckRole.bind(this, r) : null}/>
          </div>
          <label className="valign-middle">{r.name}</label>
        </td>
      </tr>
    )

    return (
      <CardPanel title="Roles">
        <div style={{height: 335, overflow: 'auto'}} className="relative">
          <table className="table table-hover table-noborder table-pt-none table-pb-none">
            <tbody>
            {items}
            </tbody>
          </table>
        </div>

      </CardPanel>
    )
  }

  renderMask () {
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 5}}></div>
    )
  }

  render () {
    const { handleSubmit, maps, selectedPermissions, editUser, permissions } = this.props
    const defaultmaps = maps.map(p => ({label: p.name, value: p.id}))
    if (!editUser) return <div>Loading...</div>

    const canEdit = this.checkCanEdit()
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
                  <Field name="username" component={FormInput} label="Name" className="margin-md-right"/>
                  <Field name="fullname" component={FormInput} label="Full Name" className="margin-md-right"/>

                  <Field name="password" type="password" component={FormInput} label="Password" className="margin-md-right"/>
                  <Field name="email" component={FormInput} label="Email" className="margin-md-right"/>

                  <Field name="phone" component={FormInput} label="Phone" className="margin-md-right"/>
                  <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="margin-md-right"/>

                  <Field name="enabled" component={FormCheckbox} label="Enabled" />

                  {!canEdit && this.renderMask()}
                </CardPanel>
              </div>
            </div>

            <div>
              <div className="col-md-6">
                {this.renderRoles(canEdit)}

                <Button variant="raised" onClick={() => this.setState({selectedRole: null})}
                        className="margin-md-top margin-md-bottom">Show All</Button>

              </div>
              <div className="col-md-6">
                <CardPanel title="Permissions">
                  <div style={{height: 335, overflow: 'auto'}} className="relative">
                    <table className="table table-hover table-noborder table-pt-none table-pb-none">
                      <tbody>
                      {permissions.map(p =>
                        <tr key={p.id}>
                          <td>
                            <FormControlLabel
                              control={
                                <Checkbox checked={selectedPermissions.includes(p.id)}
                                          onChange={canEdit ? this.onCheckPermission.bind(this, p.id) : null}/>
                              }
                              label={p.name}
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
