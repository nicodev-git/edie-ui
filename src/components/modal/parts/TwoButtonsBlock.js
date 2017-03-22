import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const TwoButtonsBlock = ({onSave, onClose}) => (
  <div className="form-buttons close-block">
    <FlatButton label="Save" onClick={onSave} style={buttonStyle} labelStyle={buttonTextStyle}/>
    <FlatButton label="Close" onClick={onClose} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default TwoButtonsBlock
