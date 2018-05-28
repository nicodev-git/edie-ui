import React from 'react'
import {Select, MenuItem} from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

const FormMultiSelect = ({input, label, className, fullWidth, meta: { touched, error }, value, options, onChange}) => (
  <FormControl className={className} fullWidth={fullWidth}>
    <InputLabel>{label}</InputLabel>
    <Select
      {...input}
      multiple
      value={input.value}
      onChange={onChange || input.onChange}
    >
      {options.map(option =>
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      )}
    </Select>
  </FormControl>
)

export default FormMultiSelect
