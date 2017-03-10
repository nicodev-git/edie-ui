import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import AccoutCircleIcon from 'material-ui/svg-icons/action/account-circle'

const buttonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

const iconStyle = {
  width: 30,
  height: 30
}

const ProfileMenu = ({user, onClickProfile, onClickMessages, onSignOut}) => (
  <li className="dropdown">
    <IconMenu
      iconButtonElement={
        <IconButton style={buttonStyle} iconStyle={iconStyle}>
            <AccoutCircleIcon color="#777777"/>
        </IconButton>
      }
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Profile" onTouchTap={onClickProfile}/>
      <MenuItem primaryText="Messages" onTouchTap={onClickMessages}/>
      <Divider />
      <MenuItem primaryText="Log out" onTouchTap={onSignOut}/>
    </IconMenu>
  </li>
)

export default ProfileMenu
