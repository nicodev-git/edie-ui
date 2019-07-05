import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CreateIcon from '@material-ui/icons/Create'
import { buttonStyle } from 'style/common/materialStyles'

const CrudButtons = ({onAdd, onEdit, onDelete}) => (
  <div className="crud-buttons">
    {onAdd && <div className="add-button">
      <IconButton
        style={buttonStyle}

        onClick={onAdd}>
          <AddCircleIcon nativeColor="#545454"/>
      </IconButton>
    </div>}
    <div className="edit-button">
      <IconButton
        style={buttonStyle}

        onClick={onEdit}>
          <CreateIcon nativeColor="#545454"/>
      </IconButton>
    </div>
    <div className="remove-button">
      <IconButton
        style={buttonStyle}

        onClick={onDelete}>
          <DeleteIcon nativeColor="#545454"/>
      </IconButton>
    </div>
  </div>
)

export default CrudButtons
