import React from 'react'
import EditConfigModalView from './EditConfigModalView'

export default class EditConfigModal extends React.Component {
  onClickOK () {

  }
  onHide () {

  }
  render () {
    return (
      <EditConfigModalView
        onHide={this.onHide.bind(this)}
        onClickOK={this.onClickOK.bind(this)}/>
    )
  }
}
