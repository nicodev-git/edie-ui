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
      <MenuItem primaryText="Profile" onClick={onClickProfile}/>
      <MenuItem primaryText="Messages" onClick={onClickMessages}/>
      <Divider />
      <MenuItem primaryText="Log out" onClick={onSignOut}/>
    </Menu>
    <div className="sidebar-title">Profile</div>
  </div>
)

export default ProfileMenu
