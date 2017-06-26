import React from 'react'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

const CloseIconButton = ({onClick, children}) => (
  <div className="form-buttons" style={{position: 'absolute', right: 4, top: 4}}>
    {children}
    <IconButton onTouchTap={onClick}>
      <CloseIcon size={32} color="#545454"/>
    </IconButton>
  </div>
)

export default CloseIconButton
