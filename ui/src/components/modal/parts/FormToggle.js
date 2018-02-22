import React from 'react'
import Switch from 'material-ui/Switch'

const FormToggle = ({input, label, meta: {touched, error}, ...custom}) => (
  <Switch
    label={label}
    className="toggle"
    {...input}
    {...custom}
  />
)

export default FormToggle
