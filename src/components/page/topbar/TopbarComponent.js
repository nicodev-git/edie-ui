import React from 'react'
import NewsLine from './NewsLine'
import { TopHeader, SearchBarContainer, MessageBox, ProfileMenu } from './parts'

const TopbarComponent = ({user, profile, paused, onSearch, onSignOut,
  onClickProfile, onClickMessages}) => (
  <nav className="navbar navbar-default navbar-static-top no-margin"
    role="navigation" style={{zIndex: 21}}>
    <TopHeader name="Incident Manager" />
    <SearchBarContainer onSearch={onSearch} />
    <NewsLine />
    <ul className="nav navbar-nav navbar-nav-expanded nav-user-info">
      <li className="dropdown padding-md">
        {paused ? 'SYSTEM PAUSED' : ''}
      </li>
      <li className="dropdown padding-md">
        <i className="option mapalert hidden" title="UI Can't Reach Server">
          <img src="/images/red.png"
            style={{float: 'left', width: '18px', height: '18px', opacity: 0.8, padding: 0}} />
        </i>
      </li>
      <li className="dropdown padding-md">
        <img className="option loader"
          src="/images/ajax-loader.gif"
          style={{float: 'left', width: '18px', display: 'none', opacity: 0.5}} />
      </li>
      <MessageBox />
      <ProfileMenu
        user={user}
        onClickProfile={onClickProfile}
        onClickMessages={onClickMessages}
        onSignOut={onSignOut}
      />
    </ul>
    {profile}
  </nav>
)

export default TopbarComponent
