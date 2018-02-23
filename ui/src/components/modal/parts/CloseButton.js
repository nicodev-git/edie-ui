import React from 'react'
import Button from 'material-ui/Button'
import { buttonStyle } from 'style/common/materialStyles'

const CloseButton = ({onClose}) => (
  <div className="form-buttons">
    <Button variant="raised" label="Close" onClick={onClose} style={buttonStyle} />
  </div>
)

export default CloseButton
