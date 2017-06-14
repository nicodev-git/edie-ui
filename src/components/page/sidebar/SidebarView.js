import React, { Component } from 'react'
import {Drawer, IconButton} from 'material-ui'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import {badgeStyle, badgeRootStyle, iconStyle, iconButtonStyle} from 'style/materialStyles'

import SearchBarContainer from './parts/SearchBarContainer'
import MessageBox from './parts/MessageBox'
import ProfileMenu from './parts/ProfileMenu'

class SidebarView extends Component {
  constructor (props) {
    super(props)
    this.renderBadge = this.renderBadge.bind(this)
    this.renderButton = this.renderButton.bind(this)
  }

  renderBadge (item) {
    return (
      <Badge
        badgeContent={4}
        badgeStyle={badgeStyle}
        style={badgeRootStyle}
      >
        {this.renderButton(item)}
      </Badge>
    )
  }

  renderButton (item) {
    return (
      <IconButton
        tooltip={item.title}
        tooltipPosition="top-right"
        style={iconButtonStyle}
        iconStyle={iconStyle}>
          {item.icon}
      </IconButton>
    )
  }

  render2 () {
    const {onToggle, contentType, mainMenu, deviceMenu, onMainMenu, onDeviceMenu,
      device, pageId, pageType, searchVisible, group, onSearch,
      profile, user, onClickProfile, onClickMessages, onSignOut,
      sidebarMessageMenuOpen, sidebarProfileMenuOpen,
      showSidebarProfileMenu,
      openSidebarMessageMenu, closeSidebarMessageMenu
    } = this.props

    return (
      <aside className="sidebar sidebar-default sidebar-custom">
        <div>
          <IconButton
            style={iconButtonStyle}
            iconStyle={iconStyle}
            onTouchTap={onToggle}>
            <MenuIcon color="#ffffff"/>
          </IconButton>
        </div>
        <nav id="main-navigation">
          <ul className="nav nav-stacked"
            style={{display: contentType.Main === pageType ? 'block' : 'none'}}>

            {mainMenu.map((item, index) =>
              <li key={index}
                className={pageId === item.id ? 'sidebar-chosen' : ''}
                onClick={onMainMenu.bind(this, index)}>
                <div>
                  {(index !== 0) ? (<Divider style={{margin: 0, backgroundColor: '#393b42'}}/>) : null}
                  <div className="sidebar-item-container">
                    {item.badge ? this.renderBadge(item) : this.renderButton(item)}
                    <div className="sidebar-title">{item.title}</div>
                  </div>
                </div>
                {
                  index === 1 && searchVisible && pageId !== item.id ? <div className={`sidebar-tooltip`}>
                      <SearchBarContainer defaultKeyword={this.props.params.query} onSearch={onSearch}/>
                    </div> : null
                }
              </li>
            )}
            <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>
            <MessageBox
              open={sidebarMessageMenuOpen}
              openSidebarMessageMenu={openSidebarMessageMenu}
              closeSidebarMessageMenu={closeSidebarMessageMenu}/>
            <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>
            <ProfileMenu
              open={sidebarProfileMenuOpen}
              showSidebarProfileMenu={showSidebarProfileMenu}
              user={user}

              onClickProfile={onClickProfile}
              onClickMessages={onClickMessages}
              onSignOut={onSignOut}/>
          </ul>

          <ul className="nav nav-pills nav-stacked"
            style={{display: contentType.Device === pageType ? 'block' : 'none'}}>

            {deviceMenu(device ? device.id : 'main').map((item, index) => {
              if (item.group && !group) return null
              return (
                <li key={index} className={pageId === item.id ? 'active open' : ''}
                  onClick={onDeviceMenu.bind(this, index)} data-tip={item.title}>
                  <a href="javascript:;">
                    <i className={`fa fa-lg fa-fw ${item.icon}`} />{item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        {profile}
      </aside>
    )
  }

  render () {
    const {items, onClickItem, active} = this.props
    return (
      <Drawer open width={sidebarWidth} containerStyle={sidebarStyle}>
        <div className="margin-md-top">
          {items.map((item, index) =>
            <div key={index}
                 className={index === active ? 'sidebar-chosen' : ''}
                 onClick={onClickItem.bind(this, index)}>
              {index > 0 && <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>}
              <div className="sidebar-item-container">
                {this.renderButton(item)}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    )
  }
}

export default SidebarView
