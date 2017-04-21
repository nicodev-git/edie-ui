import React from 'react'
import {assign} from 'lodash'

const handleStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  padding: '2px',
  border: '2px solid #94EE2E',
  borderRadius: '3px',
  background: '#94EE2E',
  fontSize: '14px',
  textAlign: 'center',
  zIndex: 3,

  minHeight: '24px',
  marginTop: '3px'
}

export default class CustomHandle extends React.Component {
  render () {
    const style = assign({left: `${this.props.offset}%`}, handleStyle)
    return (
      <div style={style} />
    )
  }
}
