import React from 'react'

import AppDevicesModalView from './AppDevicesModalView'

export default class AppDevicesModal extends React.Component {
  render () {
    return (
      <AppDevicesModalView
        devices={[]}
        onHide={this.props.onHide}
      />
    )
  }
}
