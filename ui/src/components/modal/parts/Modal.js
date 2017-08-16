import React from 'react'

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
    const {onRequestClose} = this.props
    return (
      <Dialog open title="Dashboards" bodyStyle={dialogStyle} titleStyle={titleStyle} onRequestClose={onRequestClose}>
        <CloseIconButton onClick={onRequestClose} color="white"/>
        {this.props.children}
      </Dialog>
    )
  }
}
