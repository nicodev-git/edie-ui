import React from 'react'
import Select from 'material-ui/Select'
import {MenuItem} from 'material-ui/Menu'
import {InputLabel} from 'material-ui/Input'
import {FormControl} from 'material-ui/Form'

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
