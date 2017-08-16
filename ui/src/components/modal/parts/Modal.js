import React from 'react'
import {Dialog, Card, CardText} from 'material-ui'

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
  renderContent () {
    const {multiCard} = this.props
    if (multiCard) return this.props.children
    return (
      <Card>
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
    )
  }
  render () {
    const {onRequestClose, title, contentStyle, className} = this.props
    return (
      <Dialog
        open
        title={title}
        contentStyle={contentStyle}
        bodyStyle={dialogStyle}
        titleStyle={titleStyle}
        onRequestClose={onRequestClose}
        className={className}
      >
        <CloseIconButton onClick={onRequestClose} color="white"/>
        {this.renderContent()}
      </Dialog>
    )
  }
}
