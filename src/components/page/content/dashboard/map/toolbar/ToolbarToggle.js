import React from 'react'
import IconButton from 'material-ui/IconButton'
import CropFreeIcon from 'material-ui/svg-icons/image/crop-free'

const buttonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

const iconStyle = {
  width: 30,
  height: 30
}

const ToolbarToggle = ({onToggle}) => (
  <li>
    <IconButton
      style={buttonStyle}
      iconStyle={iconStyle}
      onTouchTap={onToggle}>
        <CropFreeIcon color="#545454"/>
    </IconButton>
  </li>
)

/* const ToolbarToggle = ({ onToggle }) => (
  <a href="javascript:;" id="map-header-toggle" onClick={onToggle}>
    <img src="/images/arrow-up.png" width="14" height="14" className="up" />
    <img src="/images/arrow-down.png" width="14" height="14" className="down" />
  </a>
) */

export default ToolbarToggle
