import React from 'react'
import PasswordModal from '../../../../../components/page/content/settings/users/PasswordModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateSettingUser,
  closeUserPasswordModal
} from '../../../../../actions'

@connect(
  state => ({ editUser: state.settings.editUser }),
  dispatch => ({
    ...bindActionCreators({
      updateSettingUser,
      closeUserPasswordModal
    }, dispatch)
  })
)
export default class PasswordModalContainer extends React.Component {
  render () {
    return (
      <PasswordModal {...this.props} />
    )
  }
}
