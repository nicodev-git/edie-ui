import React from 'react'
import {RaisedButton} from 'material-ui'
import { buttonStyle, buttonTextStyle } from 'style/common/materialStyles'

const SubmitBlock = ({name, onClick}) => (
  <div className="form-buttons">
    <RaisedButton type="submit" label={name} style={buttonStyle} labelStyle={buttonTextStyle}/>
    {onClick && <RaisedButton label="Close" onClick={onClick} style={buttonStyle} labelStyle={buttonTextStyle}/>}
  </div>
)

export default SubmitBlock
