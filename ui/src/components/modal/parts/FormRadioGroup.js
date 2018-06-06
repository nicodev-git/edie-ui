import React from 'react'
import {RadioGroup} from '@material-ui/core'

const FormInput = ({input, label, floatingLabel, meta: {touched, error}, ...custom}) => (
  <TextField
    {...input}
    {...custom}
    inputProps={{style: {paddingTop: 3}}}
    label={floatingLabel}
    placeholder={label}
    autoComplete={custom.type === 'password' ? 'new-password' : 'off'}
  />
)

export default FormInput
