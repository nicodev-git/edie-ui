import React from 'react'

const ZoomOptions = ({ onToggle }) => (
  <a href="javascript:;" id="map-header-toggle" onClick={onToggle}>
    <img src="/images/arrow-up.png" width="14" height="14" className="up" />
    <img src="/images/arrow-down.png" width="14" height="14" className="down" />
  </a>
)

export default ZoomOptions
