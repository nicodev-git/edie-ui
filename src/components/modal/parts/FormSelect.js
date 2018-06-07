import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'

const FormSelect = ({input, label, floatingLabel, style, fullWidth, className, meta: {touched, error}, options, ...custom}) => (
  <FormControl fullWidth={fullWidth} className={className} style={{minWidth: 160}}>
    <InputLabel>{floatingLabel}</InputLabel>
    <Select
      {...custom}
      {...input}
      placeholder={label}
      onBlur={() => input.onBlur(input.value)}
    >
      {options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
    </Select>
  </FormControl>
)

export default FormSelect
