import React from 'react'
import TimeAgo from 'react-timeago'

class OSTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  componentWillMount () {
    this.props.fetchMonitorOS(this.props.device.id)
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
      <div style={{position: 'absolute', top: 0}}>
        <span>Last Updated </span><TimeAgo date={monitorsUpdateTime}/>
      </div>
    )
  }
  renderContent () {
    const {monitorOS} = this.props
    if (!monitorOS) return 'Loading...'
    return (
      <div>
        <h4>OS: {monitorOS.dataobj.Name} {monitorOS.dataobj.ServicePack}</h4>
        <h4>Version: {monitorOS.dataobj.Version}</h4>
      </div>
    )
  }
  render () {
    return (
      <div className="padding-md"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {this.renderHoverLabel()}
        {this.renderContent()}
      </div>
    )
  }
}

export default OSTable
