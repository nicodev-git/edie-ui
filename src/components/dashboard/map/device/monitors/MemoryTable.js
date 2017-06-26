import React from 'react'

class MemoryTable extends React.Component {
  renderContent () {
    const {monitorMemory} = this.props
    const color = monitorMemory ? 'black' : 'lightgray'
    const p = monitorMemory ? monitorMemory.dataobj : {UsedSize: 2000, TotalSize: 4096}
    return (
      <div className="inline-block padding-sm">
        <div style={{position: 'relative', marginBottom: '2px'}} className="inline-block">
          <img src="/resources/images/dashboard/map/device/monitors/ram.png" width="70" className="padding-sm"/>
          <div className="centered" style={{marginTop: '-4px', color}}>
            {monitorMemory && <span>{Math.ceil(p.UsedSize * 100 / p.TotalSize)}%</span>}
          </div>
        </div>
        {
          monitorMemory
            ? <div style={{fontSize: '11px', color}}>
              {(p.UsedSize / 1024).toFixed(1)}GB / {(p.TotalSize / 1024).toFixed(1)}GB
            </div>
            : <div style={{height: '12px', position: 'relative', background: '#EAEAEA', marginTop: '3px'}}/>
        }

      </div>
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

export default MemoryTable
