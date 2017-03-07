import React from 'react'
import SuperSelectField from 'material-ui-superselectfield'

const FormMultiSelect = ({input, label, meta: { touched, error }, options, name}) => (
  <SuperSelectField
    name={name}
    hintText={label}
    errorText={touched && error}
    multiple
    {...input}
    onChange={(values, name) => input.onChange(values)}>
    {options.map(option => (<div key={option.value} value={option.value} primaryText={option.label}></div>))}
  </SelectField>
)

export default FormMultiSelect
