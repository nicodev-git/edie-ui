import React from 'react'
import NewsLine from './NewsLine'

const TopbarComponent = ({user, profile, paused, onSearch, onSignOut,
  onClickProfile, onClickMessages}) => (
  <nav className="navbar navbar-default navbar-static-top no-margin"
    role="navigation" style={{zIndex: 21}}>
    <div className="navbar-brand-group">
      <a className="navbar-brand hidden-xxs" href="/">
        <span className="sc-visible"> I </span>
        <span className="sc-hidden">
          <span className="semi-bold">Incident Manager</span>
        </span>
      </a>
    </div>

    <ul className="nav navbar-nav navbar-nav-expanded pull-left">
      <li className="hidden-xs" style={{ marginTop: '4px' }}>
        <div className="navbar-form">
          <div className="navbar-search">
            <a onClick={onSearch}>
              <i className="fa fa-search" />
            </a>
          </div>
        </div>
      </li>
    </ul>

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

      <li className="dropdown">
        <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
          <i className="glyphicon glyphicon-envelope" style={{padding: '2px'}} />
          <span className="badge badge-up badge-dark badge-small">3</span>
        </a>
        <ul className="dropdown-menu dropdown-messages pull-right">
          <li className="dropdown-title bg-inverse">New Messages</li>
          <li className="unread">
            <a href="javascript:;" className="message">
              <img className="message-image img-circle"
                src="/images/avatars/1.jpg"/>

              <div className="message-body">
                <strong>Ernest Kerry</strong><br/> Hello, You there?<br/>
                <small className="text-muted">8 minutes ago</small>
              </div>
            </a>
          </li>
          <li className="unread"><a href="javascript:;" className="message">
            <img className="message-image img-circle" src="/images/avatars/3.jpg"/>
            <div className="message-body">
              <strong>Don Mark</strong><br/> I really appreciate your&hellip;
              <br/><small className="text-muted">21 hours</small>
            </div>
          </a></li>
          <li className="dropdown-footer"><a
            href="javascript:showMessages();">
            <i className="fa fa-share" />See all messages</a></li>
        </ul>
      </li>

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
    </ul>
    {profile}
  </nav>
)

export default TopbarComponent
