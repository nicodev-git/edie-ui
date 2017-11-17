import React from 'react'
import TextField from 'material-ui/TextField'
import { errorStyle, inputStyle, inputContainerStyle, underlineStyle } from 'style/common/materialStyles'

const FormInput = ({input, label, floatingLabel, meta: { touched, error }, ...custom}) => (
  <TextField
    {...input}
    {...custom}
    style={inputContainerStyle}
    hintText={label}
    floatingLabelText={floatingLabel}
    errorText={touched && error}
    errorStyle={errorStyle}
    inputStyle={inputStyle}
    underlineFocusStyle={underlineStyle}
    autoComplete={custom.type === 'password' ? 'new-password' : 'off'}
  />
)

export default FormInput
