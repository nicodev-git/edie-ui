import React from 'react'

export default class ShowMoreLine extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  onClickMore () {
    this.setState({expanded: true})
  }
  render () {
    const {text} = this.props
    if (this.state.expanded || text.length < 150) {
      return (
        <div>{text}</div>
      )
    }
    return (
      <div className="nowrap" style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
        {text}<br/>
        <a href="javascript:;" onClick={this.onClickMore.bind(this)}>Show More...</a>
      </div>
    )
  }
}
