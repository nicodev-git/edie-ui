import React from 'react'

class DiskTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorDisk()
  }
  buildProgress (val, title, key) {
    let color = 'red'
    const textcolor = 'black'
    if (val < 70) color = 'green'
    else if (val < 90) color = '#fec835'

    return (
      <div key={key || title} className="progress" style={{height: '12px', position: 'relative'}} title={title || ''}>
        <div className="progress-label" style={{fontSize: '9px', top: '1px', textAlign: 'center', position: 'absolute', width: '100%', color: textcolor}}>{val}%</div>
        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
            style={{width: `${val}%`, backgroundColor: color}}/>
      </div>
    )
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
