import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import EmailIcon from 'material-ui/svg-icons/communication/email'
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

const menuStyle = {
  width: '100%',
  height: '100%'
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

const MessageBox = () => (
  <li className="dropdown">
    <Badge
      badgeContent={4}
      badgeStyle={badgeStyle}
      style={rootStyle}
      >
        <IconMenu
          style={menuStyle}
          iconButtonElement={
            <IconButton
              style={buttonStyle}
              iconStyle={iconStyle}>
                <EmailIcon color="#777777"/>
            </IconButton>
          }
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="New messages" />
          <MenuItem>
            <Message
              avatar="/images/avatars/1.jpg"
              name="Ernest Kerry"
              message="Hello, You there?"
              time="8 minutes ago"
            />
          </MenuItem>
          <MenuItem>
            <Message
              avatar="/images/avatars/3.jpg"
              name="Don Mark"
              message="I really appreciate your&hellip;"
              time="21 hours"
            />
          </MenuItem>
          <MenuItem primaryText="See all messages" />
        </IconMenu>
    </Badge>
  </li>
)

export default MessageBox

/* <li className="dropdown">
  <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
    <i className="glyphicon glyphicon-envelope" style={{padding: '2px'}} />
    <span className="badge badge-up badge-dark badge-small">3</span>
  </a>
  <Messages />
</li> */
