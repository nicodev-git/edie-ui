import React from 'react'
import Checkbox from 'material-ui/Checkbox'

const Checkbox = ({label, disabled, defaultChecked}) => (
  <Checkbox
    label={label}
    disabled={disabled}
    defaultChecked={defaultChecked}
  />
)

export default Checkbox
