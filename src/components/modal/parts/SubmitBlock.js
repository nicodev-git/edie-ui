import React from 'react'
import {Button} from '@material-ui/core'
import { buttonStyle } from 'style/common/materialStyles'

const SubmitBlock = ({name, className, onCancel}) => (
  <div className={`form-buttons ${className}`}>
    <Button variant="raised" type="submit" style={buttonStyle} >{name}</Button>
    {onCancel ? <Button variant="raised" onClick={onCancel} className="margin-md-left">Close</Button> : null}
  </div>
)

export default SubmitBlock
