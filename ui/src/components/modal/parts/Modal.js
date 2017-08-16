import React from 'react'
import {Dialog} from 'material-ui'

import CloseIconButton from './CloseIconButton'

const dialogStyle = {
  background: '#efefef',
  padding: '8px 48px 48px',
  overflowY: 'auto'
}
const titleStyle = {
  background: '#324454',
  color: 'white',
  fontSize: 14,
  paddingTop: 12,
  paddingBottom: 12
}

export default class Modal extends React.Component {
  render () {
    const {onRequestClose, title, contentStyle} = this.props
    return (
      <Dialog open title={title} contentStyle={contentStyle} bodyStyle={dialogStyle} titleStyle={titleStyle} onRequestClose={onRequestClose}>
        <CloseIconButton onClick={onRequestClose} color="white"/>
        {this.props.children}
      </Dialog>
    )
  }
}
