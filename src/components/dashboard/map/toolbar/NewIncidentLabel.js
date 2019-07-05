import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const NewIncidentLabel = ({onNewIncident}) => (
  <li>
    <IconButton
      style={buttonStyle}

      onClick={onNewIncident}>
        <AddCircleIcon nativeColor="#545454"/>
    </IconButton>
  </li>
)

export default NewIncidentLabel
