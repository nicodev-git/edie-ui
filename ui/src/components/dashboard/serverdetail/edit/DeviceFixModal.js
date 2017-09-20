import React from 'react'

import DeviceFixModalView from './DeviceFixModalView'

export default class DeviceFixModal extends React.Component {
  onHide () {

  }
  render () {
    return (
      <DeviceFixModalView
        {...this.props}
        msg="Please check credentials"
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
