import React from 'react'
import {RelDevicesModalView} from 'components/modal'

export default class RelDevicesModal extends React.Component {
  componentWillMount () {
    this.props.fetchRelDevices(this.props.params, this.props.searchFields.join(','))
  }
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
