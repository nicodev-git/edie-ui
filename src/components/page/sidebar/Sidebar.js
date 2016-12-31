import React from 'react'
import $ from 'jquery'

export default class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tooltipTop: 0,
      tooltipText: ''
    }
  }

  componentDidMount () {
    this.initMenuItemHover()
  }

  componentWillUnmount () {
    this.destoryMenuItemHover()
  }

  initMenuItemHover () {
    const nav = this.nav
    $(nav).on('mouseover', 'li', (e) => { // eslint-disable-line no-undef
      if (!$('body').hasClass('sidebar-condensed')) return // eslint-disable-line no-undef

      let li = $(e.target).closest('li') // eslint-disable-line no-undef

      this.setState({
        tooltipTop: li.position().top + 5,
        tooltipText: li.find('a').text()
      })
    })

    $(nav).on('mouseout', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ tooltipText: '' })
    })

    $(nav).on('touchend', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ tooltipText: '' })
    })
  }

  destoryMenuItemHover () {
    const nav = this.nav
    $(nav).off('mouseover', 'li') // eslint-disable-line no-undef
    $(nav).off('mouseout', 'li') // eslint-disable-line no-undef
    $(nav).off('touchend', 'li') // eslint-disable-line no-undef
  }

  onClickToggleSidebar () {
    $('body').toggleClass('sidebar-condensed') // eslint-disable-line no-undef
  }

  onClickDeviceMenu (index) {
    this.setState({ tooltipText: '' })
    this.props.onClickItem(this.props.contentType.Device, this.props.deviceMenu[index])
  }

  onClickMainMenu (index) {
    this.setState({ tooltipText: '' })
    this.props.onClickItem(this.props.contentType.Main, this.props.mainMenu[index])
  }

  onMapDeviceClicked (device) {
        // this.setState({device}, () => {
        //     var menuItems = $('#tab-device li').not(':eq(0)');
        //     menuItems.removeClass('active');
        //
        //     $('.btn-main').click()
        // })
  }

  render () {
    const {device, pageId, pageType} = this.props
    const group = device && device.type === 'group'

    return (
      <aside className="sidebar sidebar-default">
        <div className="sidebar-minimize">
          <a href="javascript:;"
            style={{color: 'white'}} onClick={this.onClickToggleSidebar.bind(this)}>
            <i className="fa fa-lg fa-fw fa-bars" />
          </a>
        </div>
        <nav ref={nav => { this.nav = nav }}>
          <ul className="nav nav-pills nav-stacked" style={{display: this.props.contentType.Main === pageType ? 'block' : 'none'}}>

            {this.props.mainMenu.map((item, index) =>
              <li key={index}
                className={pageId === item.id ? 'active open' : ''}
                onClick={this.onClickMainMenu.bind(this, index)}>

                <a href="javascript:;">
                  <i className={`fa fa-lg fa-fw ${item.icon}`} />{item.title}
                </a>
              </li>
            )}

          </ul>

          <ul className="nav nav-pills nav-stacked"
            style={{display: this.props.contentType.Device === pageType ? 'block' : 'none'}}>

            {this.props.deviceMenu.map((item, index) => {
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
  }
}
