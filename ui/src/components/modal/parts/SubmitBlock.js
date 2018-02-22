import React from 'react'
import {Button} from 'material-ui'
import { buttonStyle, buttonTextStyle } from 'style/common/materialStyles'

const SubmitBlock = ({name, className}) => (
  <div className={`form-buttons ${className}`}>
    <Button variant="raised" type="submit" label={name} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default SubmitBlock
