import React from 'react'
import $ from 'jquery'
import { isGroup } from 'shared/Global'
import SidebarView from './SidebarView'

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
    // const nav = this.nav
    let nav = document.getElementById('main-navigation')
    console.log(nav)
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
    // const nav = this.nav
    let nav = document.getElementById('main-navigation')
    $(nav).off('mouseover', 'li') // eslint-disable-line no-undef
    $(nav).off('mouseout', 'li') // eslint-disable-line no-undef
    $(nav).off('touchend', 'li') // eslint-disable-line no-undef
  }

  onClickToggleSidebar () {
    $('body').toggleClass('sidebar-condensed') // eslint-disable-line no-undef
  }

  onClickDeviceMenu (index) {
    this.setState({ tooltipText: '' })
    this.props.onClickItem(this.props.contentType.Device, this.props.deviceMenu(this.props.device.id)[index])
  }

  onClickMainMenu (index) {
    this.setState({ tooltipText: '' })
    this.props.onClickItem(this.props.contentType.Main, this.props.mainMenu[index])
  }

  onMapDeviceClicked (device) {

  }

  render () {
    const device = this.props.device
    const group = isGroup(device)
    return (
      <SidebarView
        onToggle={this.onClickToggleSidebar.bind(this)}
        onMainMenu={this.onClickMainMenu.bind(this)}
        onDeviceMenu={this.onClickDeviceMenu.bind(this)}
        tooltipText={this.state.tooltipText}
        tooltipTop={this.state.tooltipTop}
        group={group}
        {...this.props}
      />
    )
  }
}
