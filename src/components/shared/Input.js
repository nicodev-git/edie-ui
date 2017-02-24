import React from 'react'

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type} />
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
)

export default Input

