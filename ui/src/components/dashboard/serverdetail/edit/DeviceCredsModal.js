import React from 'react'

import DeviceCredsModalView from './DeviceCredsModalView'

export default class DeviceCredsModal extends React.Component {
  render () {
    return (
      <DeviceCredsModalView
        {...this.props}
      />
    )
  }
}
