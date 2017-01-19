import React from 'react'
import Topbar from '../../../components/page/topbar/Topbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appendComponent, removeComponent } from '../../../util/Component'
import { signOut, openProfileModal, closeProfileModal, fetchUserInfo, updateUserProfile } from '../../../actions'

class TopbarContainer extends React.Component {
  render () {
    return (
      <Topbar {...this.props} />
    )
  }
}

export default connect(
  state => ({
    user: state.dashboard.userInfo || {},
    profileModalVisible: state.dashboard.profileModalVisible,
    maps: state.dashboard.maps
  }),
  dispatch => ({
    ...bindActionCreators({
      signOut,
      openProfileModal,
      closeProfileModal,
      appendComponent,
      removeComponent,
      fetchUserInfo,
      updateUserProfile
    }, dispatch)
  })
)(TopbarContainer)
