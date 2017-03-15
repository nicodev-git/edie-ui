import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import InboxIcon from 'material-ui/svg-icons/content/inbox'
import Message from './Message'

const badgeStyle = {
  backgroundColor: '#d32f2f',
  color: '#f5f5f5',
  width: 15,
  height: 15,
  padding: 0,
  top: 7,
  right: 7,
  zIndex: 2
}

const rootStyle = {
  padding: '8px 8px 8px 8px',
  height: 50
}

const buttonStyle = {
  padding: '4px',
  width: '100%',
  height: '100%'
}

const iconStyle = {
  width: 30,
  height: 30
}

const iconMenuStyle = {
  paddingTop: '0px',
  paddingBottom: '0px'
}

const dividerStyle = {
  marginTop: '0px',
  marginBottom: '0px'
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

const MessageBox = () => (
  <li className="dropdown">
    <Badge
      badgeContent={4}
      badgeStyle={badgeStyle}
      style={rootStyle}
      >
        <IconMenu
          iconButtonElement={
            <IconButton
              style={buttonStyle}
              iconStyle={iconStyle}>
                <EmailIcon color="#777777"/>
            </IconButton>
          }
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          listStyle={iconMenuStyle}
        >
          <MenuItem style={seeAllStyle} primaryText="New messages" />
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
            primaryText="See all messages"
            leftIcon={<InboxIcon/>}
            style={seeAllStyle}/>
        </IconMenu>
    </Badge>
  </li>
)

export default MessageBox
