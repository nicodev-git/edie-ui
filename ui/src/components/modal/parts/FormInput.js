import React from 'react'
import TextField from 'material-ui/TextField'

const FormInput = ({input, label, floatingLabel, meta: {touched, error}, ...custom}) => (
  <TextField
    {...input}
    {...custom}
    label={floatingLabel}
    placeholder={label}
    autoComplete={custom.type === 'password' ? 'new-password' : 'off'}
  />
)

export default FormInput
