import React from 'react'
import TextField from 'material-ui/TextField'

const labelStyle = {
  color: '#5683bb'
}

const errorStyle = {
  color: '#d32f2f'
}

const inputStyle = {
  color: '#777777'
}

const FormInput = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    floatingLabelStyle={labelStyle}
    errorText={touched && error}
    errorStyle={errorStyle}
    inputStyle={inputStyle}
    underlineFocusStyle={labelStyle}
    {...input}
    {...custom}
  />
)

export default FormInput
