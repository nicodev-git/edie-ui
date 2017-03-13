import React, { Component } from 'react'
import DeviceMenu from '../DeviceMenu'
import IconButton from 'material-ui/IconButton'
import DevicesIcon from 'material-ui/svg-icons/device/devices'

const buttonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

const iconStyle = {
  width: 30,
  height: 30
}

class DeviceMenuContainer extends Component {
  render () {
    return (
      <li>
        <IconButton
          style={buttonStyle}
          iconStyle={iconStyle}
          onTouchTap={this.props.onDeviceMenu}>
            <DevicesIcon color="#545454"/>
        </IconButton>
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

/* class DeviceMenuContainer extends Component {
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

export default DeviceMenuContainer */
