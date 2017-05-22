import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { checkboxStyle } from 'style/materialStyles'

const FormCheckbox = ({input, label, labelPosition, meta: { touched, error }, ...custom}) => (
  <Checkbox
    label={label}
    labelPosition={labelPosition || 'left'}
    labelStyle={checkboxStyle}
    iconStyle={checkboxStyle}
    checked={!!input.value}
    onCheck={(e) => input.onChange(e)}
    {...input}
    {...custom}
  />
)

export default FormCheckbox
