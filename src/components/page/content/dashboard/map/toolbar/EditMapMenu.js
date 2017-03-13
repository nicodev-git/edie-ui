import React, { Component } from 'react'
import DeviceMenu from '../DeviceMenu'
import EditMapHeader from './EditMapHeader'
import EditMapItems from './EditMapItems'

class EditMapMenu extends Component {
  render () {
    let isDevicesDisplayed = this.props.isDevicesDisplayed
    return (
      <li className={isDevicesDisplayed ? '' : 'dropdown'} ref="liDevices">
        <EditMapHeader
          isDevicesDisplayed={isDevicesDisplayed}
          onClick={this.props.onAdd}
        />
        <EditMapItems
          onClick={this.props.onMapEdit}
          editable={this.props.editable}
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

export default EditMapMenu
