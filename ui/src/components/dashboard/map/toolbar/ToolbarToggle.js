import React from 'react'
import IconButton from 'material-ui/IconButton'
import CropFreeIcon from 'material-ui-icons/CropFree'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const ToolbarToggle = ({onToggle}) => (
  <IconButton
    style={buttonStyle}

    onTouchTap={onToggle}>
    <CropFreeIcon nativeColor="#545454"/>
  </IconButton>
)

export default ToolbarToggle
