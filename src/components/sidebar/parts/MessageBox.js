import React from 'react'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import {Menu, MenuItem} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import EmailIcon from '@material-ui/icons/Email'
import InboxIcon from '@material-ui/icons/Inbox'
import Message from './Message'

import {badgeStyle, badgeRootStyle, iconButtonStyle} from 'style/common/materialStyles'

const iconMenuStyle = {
  paddingTop: '0px',
  paddingBottom: '0px'
}

const dividerStyle = {
  marginTop: '0px',
  marginBottom: '0px'
}

const newStyle = {
  backgroundColor: '#52a1bf',
  color: '#ffffff',
  paddingTop: '3px',
  paddingBottom: '3px'
}

const seeAllStyle = {
  backgroundColor: '#e8e6e6',
  paddingTop: '3px',
  paddingBottom: '3px'
}

const messageStyle = {
  paddingTop: '3px',
  paddingBottom: '3px'
}

const MessageBox = ({open, openSidebarMessageMenu, closeSidebarMessageMenu}) => (
  <div className="sidebar-item-container" onClick={openSidebarMessageMenu}>
    <Badge
      badgeContent={4}
      badgeStyle={badgeStyle}
      style={badgeRootStyle}
    >
      <IconButton
        style={iconButtonStyle}

        data-tip="Messages"
        data-place="right"
      >
        <EmailIcon nativeColor="#777777"/>
      </IconButton>
      <Menu
        open={open}
        onRequestChange={(value) => value ? openSidebarMessageMenu() : closeSidebarMessageMenu()}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        listStyle={iconMenuStyle}
      >
        <MenuItem style={newStyle}>New messages</MenuItem>
        <Divider style={dividerStyle}/>
        <MenuItem style={messageStyle}>
          <Message
            avatar="/images/avatars/1.jpg"
            name="Ernest Kerry"
            message="Hello, You there?"
            time="8 minutes ago"
          />
        </MenuItem>
        <Divider style={dividerStyle}/>
        <MenuItem style={messageStyle}>
          <Message
            avatar="/images/avatars/3.jpg"
            name="Don Mark"
            message="Hello? How are you? Do you want to go to my birthday party?"
            time="21 hours"
          />
        </MenuItem>
        <Divider style={dividerStyle}/>
        <MenuItem
          className="see-all-messages"
          style={seeAllStyle}><InboxIcon/>See all messages</MenuItem>
      </Menu>
    </Badge>
    <div className="sidebar-title">Messages</div>
  </div>
)

export default MessageBox
