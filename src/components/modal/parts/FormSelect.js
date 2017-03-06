import React from 'react'
import SelectField from 'material-ui/SelectField'

const FormSelect = ({input, label, meta: { touched, error }, children}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
)

export default FormSelect
