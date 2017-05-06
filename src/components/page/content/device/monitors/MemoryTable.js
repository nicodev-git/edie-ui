import React from 'react'

class MemoryTable extends React.Component {
  renderContent () {
    const {monitorMemory} = this.props
    if (!monitorMemory) return null
    const p = monitorMemory.dataobj
    return (
      <div className="inline-block padding-sm">
        <div style={{position: 'relative', marginBottom: '2px'}} className="inline-block">
          <img src="/images/ram.png" width="70" className="padding-sm"/>
          <div className="centered" style={{marginTop: '-4px'}}>
            {Math.ceil(p.UsedSize * 100 / p.TotalSize)}%
          </div>
        </div>
        <div style={{fontSize: '11px'}}>
          {(p.UsedSize / 1024).toFixed(1)}GB / {(p.TotalSize / 1024).toFixed(1)}GB
        </div>
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
