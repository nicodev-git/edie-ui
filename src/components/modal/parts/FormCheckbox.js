import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { checkboxStyle } from 'style/materialStyles'

const FormCheckbox = ({input, label, meta: { touched, error }, ...custom}) => (
  <Checkbox
    label={label}
    labelPosition="left"
    labelStyle={checkboxStyle}
    {...input}
    {...custom}
  />
)

export default FormCheckbox
