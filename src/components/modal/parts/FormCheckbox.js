import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'

const FormCheckbox = ({input, label, meta: {touched, error}, ...custom}) => (
  <FormControlLabel
    control={
      <Checkbox
        {...input}
        {...custom}
        checked={!!input.value}
        onChange={(event, isInputChecked) => input.onChange(isInputChecked)}
        value=""
      />
    }
    label={label}
  />

)

export default FormCheckbox
