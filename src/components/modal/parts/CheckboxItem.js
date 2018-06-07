import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'

const CheckboxItem = ({label, disabled, defaultChecked}) => (
  <FormControlLabel
    control={
      <Checkbox disabled={disabled} defaultChecked={defaultChecked}/>
    }
    label={label}
  />
)

export default CheckboxItem
