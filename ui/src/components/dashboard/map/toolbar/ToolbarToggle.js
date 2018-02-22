import React from 'react'
import IconButton from 'material-ui/IconButton'
import CropFreeIcon from 'material-ui-icons/CropFree'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const iconStyle = {
  width: 30,
  height: 30
}

const ToolbarToggle = ({onToggle}) => (
  <IconButton
    style={buttonStyle}
    iconStyle={iconStyle}
    onTouchTap={onToggle}>
    <CropFreeIcon color="#545454"/>
  </IconButton>
)

export default ToolbarToggle
