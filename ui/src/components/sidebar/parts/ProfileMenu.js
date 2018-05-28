import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import {Menu, MenuItem} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import AccoutCircleIcon from '@material-ui/icons/AccountCircle'

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
