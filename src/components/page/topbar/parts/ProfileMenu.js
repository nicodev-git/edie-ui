import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import AccoutCircleIcon from 'material-ui/svg-icons/action/account-circle'

const ProfileMenu = ({user, onClickProfile, onClickMessages, onSignOut}) => (
  <li className="dropdown">
    <IconMenu
      iconButtonElement={
        <IconButton>
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

/* const ProfileMenu = ({user, onClickProfile, onClickMessages, onSignOut}) => (
  <li className="dropdown">
    <a data-toggle="dropdown" className="dropdown-toggle navbar-user" href="javascript:;">
      <img className="img-circle profile-image"
        src={(user && user.picture) ? (`/externalpictures?name=${user.picture}`) : '/images/unknown.png'}/>
      <span className="hidden-xs" />
      <b className="caret" />
    </a>
    <ul className="dropdown-menu pull-right">
      <li className="arrow" />

      <li><a href="javascript:;" onClick={onClickProfile}>Profile</a></li>
      <li><a href="javascript:;" onClick={onClickMessages}>Messages</a></li>
      <li className="divider" />

      <li><a href="javascript:" onClick={onSignOut}>Log Out</a></li>
    </ul>
  </li>
)

export default ProfileMenu */
