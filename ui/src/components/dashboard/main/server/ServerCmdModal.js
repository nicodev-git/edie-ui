import React from 'react'
import ServerCmdModalView from './ServerCmdModalView'

export default class ServerCmdModal extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <ServerCmdModalView
        onHide={onHide}
      />
    )
  }
}
