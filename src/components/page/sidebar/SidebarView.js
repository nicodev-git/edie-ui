import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import {badgeStyle, badgeRootStyle, iconStyle, iconButtonStyle} from '../../../style/materialStyles'

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
    device, pageId, pageType, tooltipText, tooltipTop, group} = this.props

    return (
      <aside className="sidebar sidebar-default">
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
                className={pageId === item.id ? 'active open' : ''}
                onClick={onMainMenu.bind(this, index)}>
                <div className="sidebar-item-container">
                  {item.badge ? this.renderBadge(item) : this.renderButton(item)}
                  <div className="sidebar-title">{item.title}</div>
                </div>
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

        <div className={`sidebar-tooltip${tooltipText ? '' : ' hidden'}`}
          style={{top: `${tooltipTop}px`}}>

          <div className="forceIcon">
            <i className="fa fa-caret-left fa-2x" />
          </div>
          <span>{tooltipText}</span>

        </div>
      </aside>
    )
  }
}
/*    return (
      <aside className="sidebar sidebar-default">
        <div className="sidebar-minimize">
          <a href="javascript:;"
            style={{color: 'white'}} onClick={onToggle}>
            <i className="fa fa-lg fa-fw fa-bars" />
          </a>
        </div>
        <nav id="main-navigation">
          <ul className="nav nav-pills nav-stacked"
            style={{display: contentType.Main === pageType ? 'block' : 'none'}}>

            {mainMenu.map((item, index) =>
              <li key={index}
                className={pageId === item.id ? 'active open' : ''}
                onClick={onMainMenu.bind(this, index)}>

                <a href="javascript:;">
                  <i className={`fa fa-lg fa-fw ${item.icon}`} />{item.title}
                </a>
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

        <div className={`sidebar-tooltip${tooltipText ? '' : ' hidden'}`}
          style={{top: `${tooltipTop}px`}}>

          <div className="forceIcon">
            <i className="fa fa-caret-left fa-2x" />
          </div>
          <span>{tooltipText}</span>

        </div>
      </aside>
    )
  }
} */

export default SidebarView
