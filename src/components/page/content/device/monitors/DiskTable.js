import React from 'react'

class DiskTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorDisk()
  }
  renderContent () {
    const {monitorDisk} = this.props
    if (!monitorDisk) return null
    return monitorDisk.dataobj.map(d =>
      d.Drives.map(p =>
        <div key={`${d.DeviceID}-${p.Name}`} className="inline-block padding-sm">
          <div style={{position: 'relative', marginBottom: '2px'}} className="inline-block">
            <img src="/images/drive.png" width="70"/>
            <div className="centered text-white" style={{marginTop: '-4px'}}>
              {Math.ceil((p.TotalSpace - p.FreeSpace) * 100 / p.TotalSpace)}%
            </div>
          </div>
          <div style={{fontSize: '11px'}}>
            {p.Name} {p.FreeSpace}GB / {p.TotalSpace}GB
          </div>
        </div>
      )
    )
  }
  render () {
    return (
      <div className="inline-block valign-top">
        {this.renderContent()}
      </div>
    )
  }
}

export default DiskTable
