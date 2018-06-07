import React from 'react'
import CloseIconButton from './CloseIconButton'

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgb(239, 239, 239)',
  zIndex: 2000
}

const titleStyle = {
  margin: 0,
  padding: '12px 24px',
  color: 'white',
  fontSize: '14px',
  lineHeight: '32px',
  fontWeight: 400,
  background: 'rgb(50, 68, 84)'
}

const contentStyle = {
  padding: '8px 48px 48px',
  overflow: 'auto'
}

export default class ModalFull extends React.Component {
  render () {
    const {title, children, onRequestClose} = this.props
    return (
      <div style={overlayStyle} className="flex-vertical">
        <h3 style={titleStyle}>{title}</h3>
        <CloseIconButton onClick={onRequestClose} color="white"/>
        <div style={contentStyle} className="flex-1">
          {children}
        </div>
      </div>
    )
  }
}
