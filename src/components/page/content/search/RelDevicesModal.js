import React from 'react'
import {RelDevicesModalView} from 'components/modal'

export default class RelDevicesModal extends React.Component {
  onHide () {
    this.props.showRelDevicesPopover(false)
  }
  render () {
    return (
      <RelDevicesModalView
        relDevices={this.props.relDevices}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
