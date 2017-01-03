import React from 'react'
import UserModal from '../../../../../components/page/content/settings/users/UserModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeSettingUserModal, addSettingUser, updateSettingUser } from '../../../../../actions'

@connect(
  state => ({
    editUser: state.settings.editUser,
    initialValues: state.settings.editUser
  }),
  dispatch => ({
    ...bindActionCreators({
      addSettingUser,
      updateSettingUser,
      closeSettingUserModal
    }, dispatch)
  })
)
export default class UserModalContainer extends React.Component {
  render () {
    return (
      <UserModal {...this.props} />
    )
  }
}
