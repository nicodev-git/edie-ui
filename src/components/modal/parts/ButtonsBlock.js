import React from 'react'
import Button from '@material-ui/core/Button'
import { buttonStyle, buttonTextStyle } from 'style/common/materialStyles'
const ButtonsBlock = ({name1, name2, action1, action2}) => (
  <div className="form-buttons close-block">
    <Button label={name1} onClick={action1} style={buttonStyle} labelStyle={buttonTextStyle}/>
    {action2 && <Button label={name2} onClick={action2} style={buttonStyle} labelStyle={buttonTextStyle}/>}
  </div>
)
export default ButtonsBlock
