import React from 'react'
import TextField from 'material-ui/TextField'

const labelStyle = {
  color: '#5683bb'
}

const errorStyle = {
  color: '#d32f2f'
}

const inputStyle = {
  color: '#777777',
  fontSize: '18pt'
}

const textareaStyle = {
  color: '#777777',
  fontSize: '18pt'
}

const underlineStyle = {
  borderColor: '#5683bb'
}

const FormInput = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    floatingLabelStyle={labelStyle}
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
