import React from 'react'
import {RelDevicesModalView} from 'components/modal'

export default class RelDevicesModal extends React.Component {
  componentWillMount () {
    this.props.fetchRelDevices(this.props.params, this.props.searchFields.join(','))
  }
  onHide () {
    this.props.showRelDevicesPopover(false)
  }
  // onClickFields () {
  //   this.props.showSearchFieldsModal(true)
  // }
  onChangeSearchField (e, index, value) {
    this.props.updateRelDeviceFields([value])
  }
  render () {
    return (
      <RelDevicesModalView
        {...this.props}
        onHide={this.onHide.bind(this)}
        onChangeSearchField={this.onChangeSearchField.bind(this)}
      />
    )
  }
}
