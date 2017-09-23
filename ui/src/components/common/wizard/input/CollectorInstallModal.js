import React from 'react'
import CollectorInstallModalView from './CollectorInstallModalView'

export default class CollectorInstallModal extends React.Component {
  onHide () {

  }
  render () {
    return (
      <CollectorInstallModalView
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
