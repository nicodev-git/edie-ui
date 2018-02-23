import React from 'react'
import Button from 'material-ui/Button'

const style = {
  width: '100%',
  color: '#7c7c7e',
  padding: '0 2px'
}

// const labelStyle = {
//   paddingLeft: '10px'
// }

const Metric = ({icon, value, title, onClick}) => (
  <Button variant="flat"
          onTouchTap={onClick}
          style={style}
  >
    <div style={style} className="margin-sm-top">
      <span className="incident-button-value">{value}</span>
      <div className="inline-block" style={{marginTop: -15}}>{title}</div>
      <div className="inline-block">{icon}</div>
    </div>
  </Button>
)

export default Metric
