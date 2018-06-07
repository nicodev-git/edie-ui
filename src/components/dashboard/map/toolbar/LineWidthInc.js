import React from 'react'

const LineWidthInc = ({ lineGroup, onLineWidthInc }) => (
  <div className="option p-none link"
    style={{display: lineGroup ? 'block' : 'none'}}
    onClick={onLineWidthInc}
  >
    <i className="fa fa-expand" title="Increase Line Width" />
  </div>
)

export default LineWidthInc
