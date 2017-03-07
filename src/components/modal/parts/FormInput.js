import React from 'react'
import TextField from 'material-ui/TextField'
import { labelStyle, labelFocusStyle, errorStyle, inputStyle, textareaStyle,
  underlineStyle } from './materialStyles'

const FormInput = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    floatingLabelStyle={labelStyle}
    floatingLabelFocusStyle={labelFocusStyle}
    errorText={touched && error}
    errorStyle={errorStyle}
    inputStyle={inputStyle}
    textareaStyle={textareaStyle}
    underlineFocusStyle={underlineStyle}
    {...input}
    {...custom}
  />
)

export default FormInput
