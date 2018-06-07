import React from 'react'

const LineWidthDec = ({ lineGroup, onLineWidthDec }) => (
  <div className="option p-none link"
    style={{display: lineGroup ? 'block' : 'none'}}
    onClick={onLineWidthDec}
  >
    <i className="fa fa-expand" title="Decrease Line Width" />
  </div>
)

export default LineWidthDec
