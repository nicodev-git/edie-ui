import React from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const DeleteObject = ({ obj, onDelete }) => (
  <IconButton
    style={buttonStyle}
    className={obj ? '' : 'hidden'}

    onTouchTap={onDelete}>
    <DeleteIcon nativeColor="#545454"/>
  </IconButton>
)

export default DeleteObject
