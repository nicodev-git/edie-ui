import React from 'react'

const FormTextArea = ({input, label, meta: {touched, error}, ...custom}) => (
  <textarea
    {...input}
    {...custom}
    placeholder={label}
  />
)

export default FormTextArea