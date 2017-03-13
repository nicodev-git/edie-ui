import React, { Component } from 'react'
import EditMapHeader from './EditMapHeader'
import EditMapItems from './EditMapItems'

class EditMapMenu extends Component {
  onClick () {
    console.log('edit menu clicked')
  }

  render () {
    let isDevicesDisplayed = this.props.isDevicesDisplayed
    return (
      <li className={isDevicesDisplayed ? '' : 'dropdown'}>
        <EditMapHeader
          isDevicesDisplayed={isDevicesDisplayed}
          onClick={this.onClick.bind(this)}
        />
        <EditMapItems
          onClick={this.props.onMapEdit}
          editable={this.props.editable}
        />
      </li>
    )
  }
}

export default EditMapMenu
