import React from 'react'
import Sidebar from '../../../components/page/sidebar/Sidebar'
import { connect } from 'react-redux'
import { mainMenu, deviceMenu, contentType } from '../../../components/page/Config'

import {
  signOut,
  openProfileModal,
  closeProfileModal,
  fetchUserInfo,
  updateUserProfile
} from 'actions'

class SidebarContainer extends React.Component {
  render () {
    return (
      <Sidebar {...this.props} />
    )
  }
}

SidebarContainer.defaultProps = {
  device: null,
  pageId: 'dashboard',
  pageType: 'main'
}

export default connect(
  state => ({
    mainMenu,
    deviceMenu,
    contentType,

    user: state.dashboard.userInfo || {},
    profileModalVisible: state.dashboard.profileModalVisible,
    maps: state.dashboard.maps
  }), {
    signOut,
    openProfileModal,
    closeProfileModal,
    fetchUserInfo,
    updateUserProfile
  }
)(SidebarContainer)
