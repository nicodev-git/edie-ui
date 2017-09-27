import React from 'react'

import EntityDetailModalView from './EntityDetailModalView'

export default class EntityDetailModal extends React.Component {
  onHide () {
    this.props.showEntityDetailModal(false)
  }
  render () {
    return (
      <EntityDetailModalView
        {...this.props}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
