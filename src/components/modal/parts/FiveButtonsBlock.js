import React from 'react'
import { Button } from 'react-bootstrap'

const FiveButtonsBlock = ({onClickArray}) => (
  <div className="text-center padding-md">
    <Button className="btn-sm margin-sm-right" onClick={onClickArray[0]}>Copy</Button>
    <Button className="btn-sm margin-sm-right" onClick={onClickArray[1]}>Move</Button>
    <Button className="btn-sm margin-sm-right" onClick={onClickArray[2]}>Add</Button>
    <Button className="btn-sm margin-sm-right" onClick={onClickArray[3]}>Edit</Button>
    <Button className="btn-sm margin-sm-right" onClick={onClickArray[4]}>Delete</Button>
  </div>
)

export default FiveButtonsBlock
