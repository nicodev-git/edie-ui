import React from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import { connect } from 'react-redux'
import { mainMenu, deviceMenu, contentType } from 'components/Config'

import {
  signOut,
  openProfileModal,
  closeProfileModal,
  fetchUserInfo,
  updateUserProfile,
  updateQueryChips,
  updateSearchParams,

  showSidebarMessageMenu,
  showSidebarProfileMenu
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
    maps: state.dashboard.maps,
    params: state.search.params,

    sidebarMessageMenuOpen: state.dashboard.sidebarMessageMenuOpen,
    sidebarProfileMenuOpen: state.dashboard.sidebarProfileMenuOpen
  }), {
    signOut,
    openProfileModal,
    closeProfileModal,
    fetchUserInfo,
    updateUserProfile,
    updateQueryChips,
    updateSearchParams,

    showSidebarMessageMenu,
    showSidebarProfileMenu
  }
)(SidebarContainer)
