import React from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import { connect } from 'react-redux'
import { mainMenu, deviceMenu, contentType } from 'components/Config'

import {
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
    maps: state.dashboard.maps,
    params: state.search.params,

    sidebarMessageMenuOpen: state.dashboard.sidebarMessageMenuOpen
  }), {
    updateUserProfile,
    updateQueryChips,
    updateSearchParams,

    showSidebarMessageMenu,
    showSidebarProfileMenu
  }
)(SidebarContainer)
