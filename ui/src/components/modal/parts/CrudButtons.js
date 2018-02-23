import React from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import AddCircleIcon from 'material-ui-icons/AddCircle'
import CreateIcon from 'material-ui-icons/Create'
import { buttonStyle, iconStyle } from 'style/common/materialStyles'

const CrudButtons = ({onAdd, onEdit, onDelete}) => (
  <div className="crud-buttons">
    {onAdd && <div className="add-button">
      <IconButton
        style={buttonStyle}

        onTouchTap={onAdd}>
          <AddCircleIcon nativeColor="#545454"/>
      </IconButton>
    </div>}
    <div className="edit-button">
      <IconButton
        style={buttonStyle}

        onTouchTap={onEdit}>
          <CreateIcon nativeColor="#545454"/>
      </IconButton>
    </div>
    <div className="remove-button">
      <IconButton
        style={buttonStyle}

        onTouchTap={onDelete}>
          <DeleteIcon nativeColor="#545454"/>
      </IconButton>
    </div>
  </div>
)

export default CrudButtons
