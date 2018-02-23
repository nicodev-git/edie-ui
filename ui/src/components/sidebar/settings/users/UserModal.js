import React from 'react'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import { reduxForm, change } from 'redux-form'
import axios from 'axios'
import { validate } from 'components/modal/validation/NameValidation'

import UserModalView from './UserModalView'
import {mainMenu} from 'components/sidebar/Config'

class UserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.closeModal = this.closeModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.renderMapOptions = this.renderMapOptions.bind(this)
  }

  closeModal () {
    this.props.closeSettingUserModal()
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

  onClickPin () {
    axios.get('/genpin').then(response => {
      this.props.dispatch(change('userEditForm', 'pincode', response.data))
    })
  }

  onChangeRole (e) {
    this.props.selectUserRoles(e.target.value)
  }
  onChangePermission (e) {
    this.props.selectUserPermissions(e.target.value)
  }
  renderMapOptions () {
    let options = [].map(item => ({value: item.id, label: item.mapname}))
    return options
  }
  render () {
    const { handleSubmit, maps, selectedRoles, selectedPermissions, roles } = this.props
    const defaultmaps = maps.map(p => ({label: p.name, value: p.id}))
    return (
      <UserModalView
        onHide={this.closeModal}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        defaultmaps={defaultmaps}
        roles={roles}
        selectedRoles={selectedRoles}
        onChangeRole={this.onChangeRole.bind(this)}
        mainMenu={mainMenu}
        permissions={selectedPermissions}
        onChangePermission={this.onChangePermission.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {
      enabled: true,
      ...state.settings.editUser
    },
    validate: validate
  })
)(reduxForm({form: 'userEditForm'})(UserModal))
