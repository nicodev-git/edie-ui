import React from 'react'

export default class ShowMoreLine extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  render () {
    if (this.expanded) {
      return (
        <div>{this.props.text}</div>
      )
    }
    return (
      <div className="nowrap" style={{maxWidth: '100%', overflow: 'hidden'}}>
        {this.props.text}<br/>
        <a href="javascript:;"></a>
      </div>
    )
  }
}
