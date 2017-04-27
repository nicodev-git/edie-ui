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
        <div>
          {d.Drives.map(p =>
            <div key={p.Name} className="inline-block">
              <img src="/images/drive.png" width="80"/>
              <div className="centered text-white" style={{marginTop: '-4px'}}>
                {Math.ceil((p.TotalSpace - p.FreeSpace) * 100 / p.TotalSpace)}%
              </div>
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
