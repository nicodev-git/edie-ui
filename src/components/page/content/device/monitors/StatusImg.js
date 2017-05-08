import React from 'react'
import TimeAgo from 'react-timeago'

export default class StatusImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  onMouseEnter () {
    this.setState({ hovered: true })
  }
  onMouseLeave () {
    this.setState({ hovered: false })
  }
  renderHoverLabel () {
    const {monitorsUpdateTime} = this.props
    if (!this.state.hovered || !monitorsUpdateTime) return null
    return (
      <div className="__react_component_tooltip show place-right type-dark" style={{position: 'absolute', top: -10, left: 25}}>
        <span className="valign-middle nowrap">Last Updated <TimeAgo date={monitorsUpdateTime}/></span>
      </div>
    )
  }
  render () {
    return (
      <div style={{position: 'relative'}}>
        <img src="/images/green_light.png" width="16" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/>
        {this.renderHoverLabel()}
      </div>
    )
  }
}
