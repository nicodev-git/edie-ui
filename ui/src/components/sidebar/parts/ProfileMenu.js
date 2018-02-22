import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import AccoutCircleIcon from 'material-ui-icons/AccountCircle'

import {iconStyle, iconButtonStyle} from 'style/common/materialStyles'

const ProfileMenu = ({open, user, onClickProfile, onClickMessages, onSignOut, showSidebarProfileMenu}) => (
  <div className="sidebar-item-container" onClick={() => showSidebarProfileMenu(true)}>
    <IconButton
      style={iconButtonStyle}
      iconStyle={iconStyle}>
      <AccoutCircleIcon color="#777777"/>
    </IconButton>
    <Menu open={open}>
      <MenuItem primaryText="Profile" onTouchTap={onClickProfile}/>
      <MenuItem primaryText="Messages" onTouchTap={onClickMessages}/>
      <Divider />
      <MenuItem primaryText="Log out" onTouchTap={onSignOut}/>
    </Menu>
    <div className="sidebar-title">Profile</div>
  </div>
)

export default ProfileMenu
