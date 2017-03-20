import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const SubmitBlock = ({name, onClick}) => (
  <div className="form-buttons">
    <FlatButton type="submit" label={name} style={buttonStyle} labelStyle={buttonTextStyle}/>
    <FlatButton label="Close" onClick={onClick} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default SubmitBlock
