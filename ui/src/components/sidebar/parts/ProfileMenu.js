import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import AccoutCircleIcon from 'material-ui-icons/AccountCircle'

import {iconButtonStyle} from 'style/common/materialStyles'

const ProfileMenu = ({open, user, onClickProfile, onClickMessages, onSignOut, showSidebarProfileMenu}) => (
  <div className="sidebar-item-container" onClick={() => showSidebarProfileMenu(true)}>
    <IconButton
      style={iconButtonStyle}
      >
      <AccoutCircleIcon nativeColor="#777777"/>
    </IconButton>
    <Menu open={open}>
      <MenuItem onClick={onClickProfile}>Profile</MenuItem>
      <MenuItem onClick={onClickMessages}>Messages</MenuItem>
      <Divider />
      <MenuItem onClick={onSignOut}>Log out</MenuItem>
    </Menu>
    <div className="sidebar-title">Profile</div>
  </div>
)

export default ProfileMenu
