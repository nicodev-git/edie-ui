import React from 'react'

const RotateHubRight = ({ hub }) => (
  <li>
    <a href="javascript:;" className="option p-none" style={{display: hub ? 'block' : 'none'}}>
      <i className="fa fa-rotate-right" title="Rotate Right" />
    </a>
  </li>
)

export default RotateHubRight
