import React, { Component } from 'react'
import DeviceMenu from '../DeviceMenu'
import EditMapHeader from './EditMapHeader'

class DeviceMenuContainer extends Component {
  render () {
    let isDevicesDisplayed = this.props.isDevicesDisplayed
    return (
      <li className={isDevicesDisplayed ? '' : 'dropdown'}>
        <EditMapHeader
          isDevicesDisplayed={isDevicesDisplayed}
          onClick={this.props.onDeviceMenu}
        />
        { this.props.isDevicesDisplayed
          ? <DeviceMenu {...this.props}
            onClickItem={this.props.onClickDeviceItem}
            selectedItem={this.props.selectedItem}/>
          : null }
      </li>
    )
  }
}

export default DeviceMenuContainer
