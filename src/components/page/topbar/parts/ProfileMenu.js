import React from 'react'

const ProfileMenu = ({user, onClickProfile, onClickMessages, onSignOut}) => (
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

export default ProfileMenu
