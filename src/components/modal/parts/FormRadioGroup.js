import React from 'react'
import {RadioGroup} from '@material-ui/core'

const FormRadioGroup = ({input, children, ...custom}) => (
  <RadioGroup
    {...custom}
    {...input}>
    {children}
  </RadioGroup>
)

export default FormRadioGroup
