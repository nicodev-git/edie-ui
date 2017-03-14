import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const style = {
  width: '80%',
  color: '#7c7c7e'
}

const labelStyle = {
  paddingLeft: '30px'
}

export const Metric = ({icon, value, title, onClick}) => (
  <FlatButton
    label={title}
    labelPosition="before"
    labelStyle={labelStyle}
    onTouchTap={onClick}
    icon={icon}
    style={style}
  >
    <div className="incident-button-value">{value}</div>
  </FlatButton>
)

export default Metric

/* export default class Metric extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="panel panel-metric panel-metric-sm" onClick={this.props.onClick}>
        <div className={`panel-body ${this.props.className}`}>
          <div className="metric-content metric-icon">
            <div className="value">{this.props.value}</div>
            <div className="icon">
              <i className={`fa ${this.props.icon}`} />
            </div>
            <header>
              <h4 className="thin">{this.props.title}</h4>
            </header>
          </div>
        </div>
      </div>
    )
  }
} */
