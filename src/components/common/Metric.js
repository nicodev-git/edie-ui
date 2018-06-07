import React from 'react'
import Button from '@material-ui/core/Button'

const style = {
  width: '100%',
  color: '#7c7c7e',
  padding: '0 2px',
  height: 28
}

// const labelStyle = {
//   paddingLeft: '10px'
// }

const Metric = ({icon, value, title, onClick}) => (
  <Button variant="flat"
          onClick={onClick}
          style={style}
  >
    <div style={style}>
      <span className="incident-button-value">{value}</span>
      <div className="inline-block valign-middle">{title}</div>
      <div className="inline-block valign-middle margin-xs-top">{icon}</div>
    </div>
  </Button>
)

export default Metric
