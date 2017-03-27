import React from 'react'
import $ from 'jquery'
import { isGroup } from 'shared/Global'
import SidebarView from './SidebarView'
import ProfileModal from './ProfileModal'

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
    $(nav).on('mouseenter', 'li', (e) => { // eslint-disable-line no-undef
      if (!$('body').hasClass('sidebar-condensed')) return // eslint-disable-line no-undef

      let li = $(e.target).closest('li') // eslint-disable-line no-undef

      this.setState({
        searchVisible: li.index() === 1
      })
    })

    $(nav).on('mouseleave', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ searchVisible: false })
    })

    $(nav).on('touchend', 'li', (e) => { // eslint-disable-line no-undef
      this.setState({ searchVisible: false })
    })
  }

  destoryMenuItemHover () {
    // const nav = this.nav
    let nav = document.getElementById('main-navigation')
    $(nav).off('mouseenter', 'li') // eslint-disable-line no-undef
    $(nav).off('mouseleave', 'li') // eslint-disable-line no-undef
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

  onSearch (text) {
    this.props.updateSearchParams(text)
    this.props.router.push('/search')
  }

  onClickProfile () {
    this.props.openProfileModal()
  }

  onClickMessages () {
    console.log('messages clicked')
  }

  onClickSearch (value) {
    console.log('making a request... ', value)
  }

  renderProfileModal () {
    if (!this.props.profileModalVisible) return
    return (
      <ProfileModal {...this.props} />
    )
  }

  render () {
    const device = this.props.device
    const group = isGroup(device)
    return (
      <SidebarView
        {...this.props}

        onToggle={this.onClickToggleSidebar.bind(this)}
        onMainMenu={this.onClickMainMenu.bind(this)}
        onDeviceMenu={this.onClickDeviceMenu.bind(this)}
        onSearch={this.onSearch.bind(this)}
        searchVisible={this.state.searchVisible}
        group={group}
        profile={this.renderProfileModal()}
        onClickProfile={this.onClickProfile.bind(this)}
        onClickMessages={this.onClickMessages.bind(this)}
      />
    )
  }
}
