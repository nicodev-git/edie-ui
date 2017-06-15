import React from 'react'

const LineWidthDec = ({ lineGroup, onLineWidthDec }) => (
  <li>
    <a
      href="javascript:;"
      className="option p-none"
      style={{display: lineGroup ? 'block' : 'none'}}
      onClick={onLineWidthDec}
    >
      <i className="fa fa-expand" title="Decrease Line Width" />
    </a>
  </li>
)

export default LineWidthDec
