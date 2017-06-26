import React from 'react'

const TextChange = ({ text, onChange, icon, title }) => (
  <li>
    <a
      href="javascript:;"
      className="option p-none"
      style={{display: text ? 'block' : 'none'}}
      onClick={onChange}
    >
      <i className={icon} title={title} />
    </a>
  </li>
)

export default TextChange
