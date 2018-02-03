import React from 'react'
import { assign, findIndex } from 'lodash'

import { isGroup, parseSearchQuery } from 'shared/Global'
import SidebarView from './SidebarView'

export default class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchVisible: false
    }
  }

  getOption (key) {
    const list = (this.props.envVars || []).filter(u => u.envvars && u.envvars.key === key)
    if (list.length) return list[0]
    return null
  }

  getOptionValue (key, value = 'value1') {
    const option = this.getOption(key)
    if (!option) return ''
    return option.envvars[value]
  }

  getVisibleMenu () {
    const {userInfo} = this.props
    const permissions =  userInfo ? (userInfo.permissions || []) : []
    return permissions.map(p => p.name)
  }

  onClickDeviceMenu (index) {
    this.setState({ tooltipText: '' })
    this.props.onClickItem(this.props.contentType.Device, this.props.deviceMenu(this.props.device.id)[index])
  }

  onClickMainMenu (id) {
    this.setState({ tooltipText: '' })
    const index = findIndex(this.props.mainMenu, {id})
    this.props.onClickItem(this.props.contentType.Main, this.props.mainMenu[index])
  }

  onSearch (query) {
    const newChips = parseSearchQuery(query)

    this.props.history.push('/search')

    this.props.updateQueryChips(newChips)
    this.props.updateSearchParams(assign({}, this.props.params, {
      query: newChips.map(m => `${m.name}=${m.value}`).join(' and ')
    }), this.props.history)
  }

  onClickMessages () {
    console.log('messages clicked')
  }

  onClickSearch (value) {
    console.log('making a request... ', value)
  }

  render () {
    const device = this.props.device
    const group = isGroup(device)
    return (
      <SidebarView
        {...this.props}

        onMainMenu={this.onClickMainMenu.bind(this)}
        onDeviceMenu={this.onClickDeviceMenu.bind(this)}
        onSearch={this.onSearch.bind(this)}
        searchVisible={this.state.searchVisible}
        group={group}
        onClickMessages={this.onClickMessages.bind(this)}

        openSidebarMessageMenu={() => this.props.showSidebarMessageMenu(true)}
        closeSidebarMessageMenu={() => this.props.showSidebarMessageMenu(false)}

        visibleMenu={this.getVisibleMenu()}
      />
    )
  }
}
