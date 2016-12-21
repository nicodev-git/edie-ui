import React from 'react'

export default class Metric extends React.Component {
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
}
