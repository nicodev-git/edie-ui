import React from 'react'

class OSTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorOS(this.props.device.id)
  }
  render () {
    return (
      <div>
        OS: {this.props.monitorOS}
      </div>
    )
  }
}

export default OSTable
