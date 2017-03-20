import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle } from '../../../style/materialStyles'

const SubmitBlock = ({name, onClick}) => (
  <div className="form-buttons">
    <FlatButton type="submit" label={name} style={buttonStyle}/>
    <FlatButton label="Close" onClick={onClick} style={buttonStyle}/>
  </div>
)

export default SubmitBlock
