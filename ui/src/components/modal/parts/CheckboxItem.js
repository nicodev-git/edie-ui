import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'

const CheckboxItem = ({label, disabled, defaultChecked}) => (
  <FormControlLabel
    control={
      <Checkbox disabled={disabled} defaultChecked={defaultChecked}/>
    }
    label={label}
  />
)

export default CheckboxItem
