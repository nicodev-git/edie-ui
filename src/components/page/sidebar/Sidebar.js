import React from 'react'
import $ from 'jquery'
import { isGroup } from 'shared/Global'
import SidebarView from './SidebarView'

export default class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchVisible: false
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
    $(nav).on('mouseover', 'li', (e) => { // eslint-disable-line no-undef
      if (!$('body').hasClass('sidebar-condensed')) return // eslint-disable-line no-undef

      let li = $(e.target).closest('li') // eslint-disable-line no-undef

      this.setState({
        searchVisible: li.index() === 1
      })
    })

    $(nav).on('mouseout', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ searchVisible: false })
    })

    $(nav).on('touchend', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ searchVisible: false })
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
        searchVisible={this.state.searchVisible}
        group={group}
        {...this.props}
      />
    )
  }
}
