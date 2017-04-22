import React from 'react'
import {ThreatItemModalView} from 'components/modal'
export default class ThreatItemModal extends React.Component {
  onHide () {
    this.props.showThreatItemModal(false)
  }
  render () {
    return (
      <ThreatItemModalView
        entity={this.props.threatItem || {}}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
