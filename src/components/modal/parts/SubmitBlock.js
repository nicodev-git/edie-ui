import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { buttonStyle } from './materialStyles'

const SubmitBlock = ({onClick}) => (
  <div className="text-right">
    <RaisedButton type="submit" label="Submit" buttonStyle={buttonStyle} primary/>
    <RaisedButton label="Close" onClick={onClick} buttonStyle={buttonStyle} primary/>
  </div>
)

export default SubmitBlock
