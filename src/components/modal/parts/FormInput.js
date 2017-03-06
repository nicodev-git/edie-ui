import React from 'react'
import TextField from 'material-ui/TextField'

const FormInput = ({input, label, meta: { touched, error }}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)

export default FormInput
