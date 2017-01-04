import React from 'react'
import Users from '../../../../../components/page/content/settings/users/Users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchSettingUsers,
  openSettingUserModal,
  deleteSettingUser,
  openUserPasswordModal
} from '../../../../../actions'

@connect(
  state => ({
    users: state.settings.users,
    userModalVisible: state.settings.userModalVisible,
    userPasswordModalVisible: state.settings.userPasswordModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchSettingUsers,
      openSettingUserModal,
      deleteSettingUser,
      openUserPasswordModal
    }, dispatch)
  })
)
export default class UsersContainer extends React.Component {
  render () {
    return (
      <Users {...this.props} />
    )
  }
}
