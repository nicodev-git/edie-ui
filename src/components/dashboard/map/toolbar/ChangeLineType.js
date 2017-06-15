import React from 'react'

const ChangeLineType = ({ line, onChange, lineTypes }) => (
  <li>
    <a
      href="javascript:;"
      onClick={onChange}
      className="option p-none"
      style={{display: line ? 'block' : 'none'}}
    >
      <i className="fa fa-reply" title="Change Type" />
    </a>
    {lineTypes}
  </li>
)

export default ChangeLineType
