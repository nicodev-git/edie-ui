import React from 'react'

const RotateHubLeft = ({ hub }) => (
  <li>
    <a href="javascript:;" className="option p-none" style={{display: hub ? 'block' : 'none'}}>
      <i className="fa fa-rotate-left" title="Rotate Left" />
    </a>
  </li>
)

export default RotateHubLeft
