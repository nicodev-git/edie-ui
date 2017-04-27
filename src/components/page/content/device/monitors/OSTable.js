import React from 'react'

class OSTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorOS(this.props.device.id)
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
      <div className="padding-md">
        {this.renderContent()}
      </div>
    )
  }
}

export default OSTable
