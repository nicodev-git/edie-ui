import React from 'react'
import {RelDevicesModalView} from 'components/modal'

export default class RelDevicesModal extends React.Component {
  onHide () {
    this.props.showRelDevicesPopover(false)
  }
  onClickFields () {
    this.props.showSearchFieldsModal(true)
  }
  render () {
    return (
      <RelDevicesModalView
        relDevices={this.props.relDevices}
        onHide={this.onHide.bind(this)}
        onClickFields={this.onClickFields.bind(this)}
      />
    )
  }
}
