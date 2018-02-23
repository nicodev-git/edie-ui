import React from 'react'
import Button from 'material-ui/Button'

const style = {
  width: '100%',
  color: '#7c7c7e'
}

// const labelStyle = {
//   paddingLeft: '10px'
// }

const Metric = ({icon, value, title, onClick}) => (
  <Button variant="flat"
    onTouchTap={onClick}
    style={style}
  >{icon}<span className="incident-button-value">{value}</span><span>{title}</span></Button>
)

export default Metric
