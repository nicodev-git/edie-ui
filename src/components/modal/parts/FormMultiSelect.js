import React from 'react'
import SuperSelectField from 'material-ui-superselectfield'

const FormMultiSelect = ({input, label, meta: { touched, error }, options, name}) => (
  <SuperSelectField
    name={name}
    hintText={label}
    errorText={touched && error}
    multiple
    {...input}
    onChange={(values, name) => input.onChange([name] : values)}>
    {options.map(option => (<div key={option.value} value={option.value}>{option.label}</div>))}
  </SuperSelectField>
)

export default FormMultiSelect
