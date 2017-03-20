import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { buttonStyle, cancelButtonStyle } from '../../../style/materialStyles'

const SubmitBlock = ({name, onClick}) => (
  <div className="form-buttons">
    <RaisedButton type="submit" label={name} buttonStyle={buttonStyle} primary/>
    <RaisedButton label="Close" onClick={onClick} buttonStyle={cancelButtonStyle}/>
  </div>
)

export default SubmitBlock
