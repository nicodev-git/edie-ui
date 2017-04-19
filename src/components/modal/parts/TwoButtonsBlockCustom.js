import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'
const TwoButtonsBlockCustom = ({name1, name2, action1, action2}) => (
  <div className="form-buttons close-block">
    {action1 && <FlatButton label={name1} onClick={action1} style={buttonStyle} labelStyle={buttonTextStyle}/>}
    <FlatButton label={name2} onClick={action2} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)
export default TwoButtonsBlockCustom
