import React, { Component } from 'react'
import {Drawer, IconButton} from '@material-ui/core'
import Tooltip from 'rc-tooltip'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'

import {badgeStyle, badgeRootStyle, iconButtonStyle, sidebarStyle} from 'style/common/materialStyles'

import SearchBarContainer from './parts/SearchBarContainer'

const styles = {
  sidebar: sidebarStyle
}

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
      <Tooltip
        data-toggle='tooltip'
        data-placement="right" 
        mouseEnterDelay="0.2"
        trigger={['hover']} 
        overlay={item.title}>
          <IconButton
            style={iconButtonStyle}
            >
              {item.icon}
          </IconButton>
      </Tooltip>
    ) 
  }

  renderDeviceMenuItem (item, index) {
    const {pageId, group, onDeviceMenu} = this.props
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
  }

  render () {
    const {onToggle, contentType, mainMenu, deviceMenu, onMainMenu,
      device, pageId, pageType, searchVisible, onSearch,
      // sidebarMessageMenuOpen,
      // openSidebarMessageMenu, closeSidebarMessageMenu,
      user,
      // visibleMenu,
      classes
    } = this.props

    const mainMenuItems = (user.defaultPage || 'dashboard') !== 'dashboard' ? [mainMenu[1], mainMenu[0], ...mainMenu.slice(2)] : mainMenu
    const deviceMenuItems = deviceMenu(device ? device.id : 'main')
    return (
      <Drawer variant="permanent" classes={{paper: classes.sidebar}}>
        <div className="hidden">
          <IconButton
            style={iconButtonStyle}

            onClick={onToggle}>
            <MenuIcon nativeColor="#ffffff"/>
          </IconButton>
        </div>
        <div style={{display: contentType.Main === pageType ? 'block' : 'none'}} className="sidebar">
          {mainMenuItems.map((item, index) => {
            const visible = true//visibleMenu.includes(item.roleMenuId)
            return (
              <div key={index} onClick={onMainMenu.bind(this, item.id)} className={visible ? '' : 'hidden'}>
                <div className={pageId === item.id ? 'sidebar-chosen' : ''}>
                  <div className="sidebar-item-container">
                    {item.badge ? this.renderBadge(item) : this.renderButton(item)}
                    <div className="sidebar-title">{item.title}</div>
                  </div>
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

                {/*{index === 1 ? (*/}
                  {/*<MessageBox*/}
                    {/*open={sidebarMessageMenuOpen}*/}
                    {/*openSidebarMessageMenu={openSidebarMessageMenu}*/}
                    {/*closeSidebarMessageMenu={closeSidebarMessageMenu}/>*/}
                {/*) : null}*/}
                {index === 1 ? (
                  <Divider style={{margin: 0, backgroundColor: '#393b42'}}/>
                ) : null}
              </div>
            )
          })}
        </div>

        {contentType.Device === pageType ? this.renderDeviceMenuItem(deviceMenuItems[0], 0) : null}
        <div style={{display: contentType.Device === pageType ? 'block' : 'none'}} className="sidebar">
          {deviceMenuItems.map((item, index) => index > 0 ? this.renderDeviceMenuItem(item, index) : null)}
        </div>
      </Drawer>
    )
  }
}
export default withStyles(styles)(SidebarView)