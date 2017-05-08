import React from 'react'

class DiskTable extends React.Component {
  renderContent () {
    const {monitorDisk} = this.props
    const color = monitorDisk ? null : 'lightgray'
    const disks = monitorDisk ? monitorDisk.dataobj : [{Drives: [{DeviceId: 1, Name: 'C:', TotalSpace: 128, FreeSpace: 30}]}]
    return disks.map(d =>
      d.Drives.map(p =>
        <div key={`${d.DeviceID}-${p.Name}`} className="inline-block padding-sm">
          <div style={{position: 'relative', marginBottom: '2px'}} className="inline-block">
            <img src="/images/drive.png" width="70"/>
            <div className="centered text-white" style={{marginTop: '-4px', color}}>
              {Math.ceil((p.TotalSpace - p.FreeSpace) * 100 / p.TotalSpace)}%
            </div>
          </div>
          <div style={{fontSize: '11px', color}}>
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
