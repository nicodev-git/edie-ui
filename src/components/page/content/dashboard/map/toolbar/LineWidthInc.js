import React from 'react'

const LineWidthInc = ({ lineGroup, onLineWidthInc }) => (
  <li>
    <a
      href="javascript:;"
      className="option p-none"
      style={{display: lineGroup ? 'block' : 'none'}}
      onClick={onLineWidthInc}
    >
      <i className="fa fa-expand" title="Increase Line Width" />
    </a>
  </li>
)

export default LineWidthInc
