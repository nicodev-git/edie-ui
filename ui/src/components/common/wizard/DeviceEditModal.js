import React from 'react'

import DeviceEditModalView from './DeviceEditModalView'

export default class DeviceEditModal extends React.Component {
  render () {
    return (
      <DeviceEditModalView
        {...this.props}
        header="Device"
      />
    )
  }
}
