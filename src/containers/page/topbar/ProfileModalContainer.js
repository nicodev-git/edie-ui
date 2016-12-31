import React from 'react'
import ProfileModal from '../../../components/page/topbar/ProfileModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserInfo, updateUserProfile, closeProfileModal } from '../../../actions'

class ProfileModalContainer extends React.Component {
  render () {
    return (
      <ProfileModal {...this.props} />
    )
  }
}

export default connect(
  state => ({
    user: state.dashboard.userInfo,
    maps: state.dashboard.maps,
    initialValues: state.dashboard.userInfo
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchUserInfo,
      updateUserProfile,
      closeProfileModal
    }, dispatch)
  })
)(ProfileModalContainer)
