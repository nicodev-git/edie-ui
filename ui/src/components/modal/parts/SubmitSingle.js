import React from 'react'
import Button from 'material-ui/Button'
import { buttonStyle, buttonTextStyle } from 'style/common/materialStyles'

const SubmitSingle = ({name}) => (
  <div className="form-buttons">
    <Button variant="raised" type="submit" label={name}  buttonStyle={buttonStyle}/>
  </div>
)

export default SubmitSingle
