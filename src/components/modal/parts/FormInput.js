import React from 'react'
import TextField from 'material-ui/TextField'
import { errorStyle, inputStyle, underlineStyle } from 'style/materialStyles'

const FormInput = ({input, label, floatingLabel, meta: { touched, error }, ...custom}) => (
  <TextField
    hintText={label}
    floatingLabelText={floatingLabel}
    errorText={touched && error}
    errorStyle={errorStyle}
    inputStyle={inputStyle}
    underlineFocusStyle={underlineStyle}
    {...input}
    {...custom}
  />
)

export default FormInput
