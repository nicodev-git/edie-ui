import React from 'react'
import Button from '@material-ui/core/Button'
import { buttonStyle } from 'style/common/materialStyles'

const CloseButton = ({onClose}) => (
  <div className="form-buttons">
    <Button variant="raised" onClick={onClose} style={buttonStyle}>Close</Button>
  </div>
)

export default CloseButton
