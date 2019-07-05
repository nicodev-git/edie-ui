import React, { Component } from 'react'
import DeviceMenu from '../DeviceMenu'
import {IconButton} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

class DeviceMenuContainer extends Component {
  render () {
    return (
      <div className="inline-block">
        <IconButton
          id="device-menu-button"
          style={buttonStyle}

          onClick={this.props.onDeviceMenu}>
            <AddCircleIcon nativeColor="#545454"/>
        </IconButton>
        { this.props.isDevicesDisplayed
          ? <DeviceMenu {...this.props}
                        onClickItem={this.props.onClickDeviceItem}
                        selectedItem={this.props.selectedItem}
                        onNewIncident={this.props.onNewIncident}/>
          : null }
      </div>
    )
  }
}

export default DeviceMenuContainer
