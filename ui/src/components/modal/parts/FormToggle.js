import React from 'react'
import Switch from '@material-ui/core/Switch'

const FormToggle = ({input, label, meta: {touched, error}, ...custom}) => (
  <Switch
    {...input}
    {...custom}
    label={label}
    className="toggle"
    value={input.value ? "" : ""}
  />
)

export default FormToggle
