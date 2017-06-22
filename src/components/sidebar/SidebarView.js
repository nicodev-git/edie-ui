import React, { Component } from 'react'
import {Drawer, IconButton} from 'material-ui'
import Badge from 'material-ui/Badge'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import {badgeStyle, badgeRootStyle, iconStyle, iconButtonStyle, sidebarWidth, sidebarStyle} from 'style/materialStyles'

import SearchBarContainer from './parts/SearchBarContainer'
import MessageBox from './parts/MessageBox'

export default class SidebarView extends Component {
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

  render () {
    const {onToggle, contentType, mainMenu, deviceMenu, onMainMenu, onDeviceMenu,
      device, pageId, pageType, searchVisible, group, onSearch,
      sidebarMessageMenuOpen,
      openSidebarMessageMenu, closeSidebarMessageMenu
    } = this.props

    return (
      <Drawer open width={sidebarWidth} containerStyle={sidebarStyle}>
        <div className="hidden">
          <IconButton
            style={iconButtonStyle}
            iconStyle={iconStyle}
            onTouchTap={onToggle}>
            <MenuIcon color="#ffffff"/>
          </IconButton>
        </div>
        <div style={{display: contentType.Main === pageType ? 'block' : 'none'}} className="sidebar">
          {mainMenu.map((item, index) =>
            <div
              key={index}
              className={pageId === item.id ? 'sidebar-chosen' : ''}
              onClick={onMainMenu.bind(this, index)}>

              <div className="sidebar-item-container">
                {item.badge ? this.renderBadge(item) : this.renderButton(item)}
                <div className="sidebar-title">{item.title}</div>
              </div>
              {
                index === 1 && searchVisible && pageId !== item.id ? <div className={`sidebar-tooltip`}>
                  <SearchBarContainer
                    defaultKeyword={this.props.params.query}
                    onSearch={onSearch}
                    updateSidebarSearchActive={this.props.updateSidebarSearchActive}
                    sidebarSearchActive={this.props.sidebarSearchActive}
                  />
                </div> : null
              }
              <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>

              {index === 0 ? (
                <MessageBox
                  open={sidebarMessageMenuOpen}
                  openSidebarMessageMenu={openSidebarMessageMenu}
                  closeSidebarMessageMenu={closeSidebarMessageMenu}/>
              ) : null}
              {index === 0 ? (
                <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>
              ) : null}
            </div>
          )}
        </div>

        <div style={{display: contentType.Device === pageType ? 'block' : 'none'}} className="sidebar">
          {deviceMenu(device ? device.id : 'main').map((item, index) => {
            if (item.group && !group) return null
            return (
              <div key={index} className={pageId === item.id ? 'active open' : ''} onClick={onDeviceMenu.bind(this, index)}>
                {(index !== 0) ? (<Divider style={{margin: 0, backgroundColor: '#393b42'}}/>) : null}
                <div className="sidebar-item-container">
                  {this.renderButton(item)}
                  <div className="sidebar-title">{item.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      </Drawer>
    )
  }
}
