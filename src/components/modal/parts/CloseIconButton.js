import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const CloseIconButton = ({onClick, color, children}) => (
  <div style={{position: 'absolute', right: 4, top: 4}}>
    {children}
    <IconButton onClick={onClick}>
      <CloseIcon size={32} nativeColor={color || '#545454'}/>
    </IconButton>
  </div>
)

export default CloseIconButton