import React from 'react'

class DiskTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorDisk()
  }
  renderContent () {
    const {monitorDisk} = this.props
    if (!monitorDisk) return 'Loading...'
    return monitorDisk.dataobj.map(d =>
      <div key={d.DeviceID}>
        <h4>{d.DeviceID}</h4>
        <div>
          {d.Drives.map(p =>
            <div key={p.Name}>
              {p.Name}
            </div>
          )}
        </div>
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

export default DiskTable
