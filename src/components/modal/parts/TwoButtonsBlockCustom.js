import React from 'react'
import {Button} from '@material-ui/core'

const TwoButtonsBlockCustom = ({name1, name2, action1, action2}) => (
  <div className="form-buttons">
    {action1 && <Button variant="raised" onClick={action1}>{name1}</Button>}
    {action2 && <Button variant="raised" onClick={action2}>{name2}</Button>}
  </div>
)
export default TwoButtonsBlockCustom
