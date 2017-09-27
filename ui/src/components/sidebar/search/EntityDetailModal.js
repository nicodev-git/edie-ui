import React from 'react'

import EntityDetailModalView from './EntityDetailModalView'

export default class EntityDetailModal extends React.Component {
  onHide () {

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
