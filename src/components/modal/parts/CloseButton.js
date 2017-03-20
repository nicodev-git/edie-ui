import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const CloseButton = ({onClose}) => (
  <div className="form-buttons close-block">
    <FlatButton label="Close" onClick={onClose} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default CloseButton
