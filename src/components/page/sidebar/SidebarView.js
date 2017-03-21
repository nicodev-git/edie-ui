import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import {badgeStyle, badgeRootStyle, iconStyle, iconButtonStyle} from '../../../style/materialStyles'

import SearchBarContainer from './parts/SearchBarContainer'

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

  render () {
    const {onToggle, contentType, mainMenu, deviceMenu, onMainMenu, onDeviceMenu,
    device, pageId, pageType, searchVisible, group, onSearch} = this.props

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
                  index === 1 && searchVisible ? <div className={`sidebar-tooltip`}>
                      <SearchBarContainer onSearch={onSearch}/>
                    </div> : null
                }
              </li>
            )}

          </ul>

          <ul className="nav nav-pills nav-stacked"
            style={{display: contentType.Device === pageType ? 'block' : 'none'}}>

            {deviceMenu(device ? device.id : 'main').map((item, index) => {
              if (item.group && !group) return null
              return (
                <li key={index} className={pageId === item.id ? 'active open' : ''}
                  onClick={onDeviceMenu.bind(this, index)}>
                  <a href="javascript:;">
                    <i className={`fa fa-lg fa-fw ${item.icon}`} />{item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <h5 className="sidebar-header hidden">Incidents</h5>
        <div style={{padding: '0 10px 10px 10px'}} className="padding-sm graph-stack hidden">
          <span className="graph-title">Incidents By Type</span>
          <div id="maingraph" style={{background: 'white'}} />

          <span className="graph-title">Incidents By IP</span>
          <div id="maingraph2" style={{background: 'white'}} />
        </div>
      </aside>
    )
  }
}

export default SidebarView
