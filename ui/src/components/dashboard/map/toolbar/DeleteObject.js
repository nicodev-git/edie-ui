import React from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const iconStyle = {
  width: 30,
  height: 30
}

const DeleteObject = ({ obj, onDelete }) => (
  <IconButton
    style={buttonStyle}
    className={obj ? '' : 'hidden'}
    iconStyle={iconStyle}
    onTouchTap={onDelete}>
    <DeleteIcon color="#545454"/>
  </IconButton>
)

export default DeleteObject
