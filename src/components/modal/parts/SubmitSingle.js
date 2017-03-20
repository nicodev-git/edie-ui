import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const SubmitSingle = ({name}) => (
  <div className="form-buttons">
    <RaisedButton type="submit" label={name} labelStyle={buttonTextStyle} buttonStyle={buttonStyle}/>
  </div>
)

export default SubmitSingle
