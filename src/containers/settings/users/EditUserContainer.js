import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import EditUser from 'components/sidebar/settings/users/EditUser'

import {
  fetchSettingUsers,
  openSettingUserModal,
  deleteSettingUser,
  openUserPasswordModal,

  addSettingUser,
  updateSettingUser,
  closeSettingUserModal,

  closeUserPasswordModal,

  openProfileModal,
  closeProfileModal,
  changeProfileImg,
  fetchUserInfo,

  fetchSettingMaps,
  selectUserRoles,
  selectUserPermissions,

  fetchRoles,
  fetchPermissions,

  submitForm
} from 'actions'


class EditUserContainer extends React.Component {
  render () {
    return (
      <EditUser {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    users: state.settings.users,
    userModalVisible: state.settings.userModalVisible,
    userPasswordModalVisible: state.settings.userPasswordModalVisible,

    roles: state.settings.roles,

    editUser: state.settings.editUser,
    selectedRoles: state.settings.selectedRoles,
    selectedPermissions: state.settings.selectedPermissions,
    permissions: state.settings.permissions,

    user: state.dashboard.userInfo || {},
    maps: state.dashboard.maps,
    profileModalVisible: state.dashboard.profileModalVisible,
    profileImg: state.dashboard.profileImg
  }), {
    fetchSettingUsers,
    openSettingUserModal,
    deleteSettingUser,
    openUserPasswordModal,

    addSettingUser,
    updateSettingUser,
    closeSettingUserModal,

    closeUserPasswordModal,

    openProfileModal,
    closeProfileModal,
    changeProfileImg,
    fetchUserInfo,

    fetchSettingMaps,
    selectUserRoles,
    selectUserPermissions,

    fetchRoles,
    fetchPermissions,

    submitForm
  }
)(withRouter(EditUserContainer))