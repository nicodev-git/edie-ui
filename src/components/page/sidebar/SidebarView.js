import React from 'react'

const SidebarView = ({onToggle, contentType, mainMenu, onMainMenu, onDeviceMenu}) => (
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
        style={{display: this.props.contentType.Device === pageType ? 'block' : 'none'}}>

        {this.props.deviceMenu(device ? device.id : 'main').map((item, index) => {
          if (item.group && !group) return null
          return (
            <li key={index} className={pageId === item.id ? 'active open' : ''}
              onClick={this.onClickDeviceMenu.bind(this, index)}>
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

    <div className={`sidebar-tooltip${this.state.tooltipText ? '' : ' hidden'}`}
      style={{top: `${this.state.tooltipTop}px`}}
      ref="tooltipBody">

      <div className="forceIcon">
        <i className="fa fa-caret-left fa-2x" />
      </div>
      <span>{this.state.tooltipText}</span>

    </div>
  </aside>
)
