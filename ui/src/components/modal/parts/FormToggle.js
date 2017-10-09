import React from 'react'
import Toggle from 'material-ui/Toggle'
import { checkboxStyle } from 'style/common/materialStyles'

const FormToggle = ({input, label, labelPosition, meta: { touched, error }, ...custom}) => (
  <Toggle
    {...input}
    {...custom}
    label={label}
    labelPosition={labelPosition || 'right'}
    labelStyle={checkboxStyle}
    iconStyle={checkboxStyle}
    toggled={!!input.value}
    onToggle={(e) => input.onChange(e)}
  />
)

export default FormToggle
