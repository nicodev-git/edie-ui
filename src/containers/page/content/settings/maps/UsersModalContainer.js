import React from 'react'
import UsersModal from '../../../../../components/page/content/settings/maps/UsersModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSettingUsers } from '../../../../../actions'

@connect(
  state => ({ users: state.settings.users }),
  dispatch => ({
    fetchSettingUsers: bindActionCreators(fetchSettingUsers, dispatch)
  })
)
export default class UsersModalContainer extends React.Component {
  render () {
    return (
      <UsersModal {...this.props} />
    )
  }
}

UsersModal.defaultProps = {
  onClose: null
}
