import React from 'react'
import TextField from 'material-ui/TextField'
import { errorStyle, inputStyle, underlineStyle } from 'style/materialStyles'

const FormInput = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField hintText={label}
    errorText={touched && error}
    errorStyle={errorStyle}
    inputStyle={inputStyle}
    underlineFocusStyle={underlineStyle}
    {...input}
    {...custom}
  />
)

export default FormInput
