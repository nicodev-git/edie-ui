import React from 'react'
import Checkbox from 'material-ui/Checkbox'

const FormCheckbox = ({input, label, meta: { touched, error }, ...custom}) => (
  <Checkbox
    label={label}
    {...input}
    {...custom}
  />
)

export default FormCheckbox
