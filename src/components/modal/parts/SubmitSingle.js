import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { buttonStyle } from './materialStyles'

const SubmitSingle = ({name}) => (
  <div className="form-buttons">
    <RaisedButton type="submit" label={name} buttonStyle={buttonStyle} primary/>
  </div>
)

export default SubmitSingle
