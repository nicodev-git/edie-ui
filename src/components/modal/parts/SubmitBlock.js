import React from 'react'
import {Button} from '@material-ui/core'
import { buttonStyle } from 'style/common/materialStyles'

const SubmitBlock = ({name, className}) => (
  <div className={`form-buttons ${className}`}>
    <Button variant="raised" type="submit" style={buttonStyle} >{name}</Button>
  </div>
)

export default SubmitBlock
